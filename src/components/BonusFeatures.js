import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import * as StellarSdk from '@stellar/stellar-sdk';
import { retrievePublicKey } from './Freighter';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const server = new StellarSdk.Horizon.Server('https://horizon.stellar.org');

const BonusFeatures = () => {
  const [publicKey, setPublicKey] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [balances, setBalances] = useState([]);
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [addressBook, setAddressBook] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('addressBook') || '[]');
    } catch {
      return [];
    }
  });
  const [newEntry, setNewEntry] = useState({ name: '', address: '' });
  const [send, setSend] = useState({ dest: '', amount: '', asset: 'XLM' });
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const load = async () => {
      try {
        const pk = await retrievePublicKey();
        setPublicKey(pk);
        const acct = await server.loadAccount(pk);
        setBalances(acct.balances || []);

        const ops = await server
          .operations()
          .forAccount(pk)
          .order('desc')
          .limit(50)
          .call();

        const paymentOps = ops.records.filter((o) => o.type === 'payment');
        setPayments(paymentOps);
      } catch (e) {
        // silent if wallet not connected
      }
    };
    load();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (!publicKey) return;
    QRCode.toDataURL(publicKey, { width: 240 })
      .then((url) => {
        if (mounted) setQrDataUrl(url);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [publicKey]);

  useEffect(() => {
    localStorage.setItem('addressBook', JSON.stringify(addressBook));
  }, [addressBook]);

  const chartData = React.useMemo(() => {
    const labels = payments.map((p) => new Date(p.created_at).toLocaleString()).reverse();
    const data = payments.map((p) => parseFloat(p.amount || p.amount_str || 0)).reverse();
    return {
      labels,
      datasets: [
        {
          label: 'Recent Payment Amounts',
          data,
          fill: false,
          borderColor: '#3b82f6',
        },
      ],
    };
  }, [payments]);

  const filteredPayments = payments.filter((p) => {
    if (!filter) return true;
    const q = filter.toLowerCase();
    return (
      p.id?.toLowerCase().includes(q) ||
      p.type?.toLowerCase().includes(q) ||
      (p.to || '').toLowerCase().includes(q) ||
      (p.from || '').toLowerCase().includes(q) ||
      (p.amount || '').toLowerCase().includes(q) ||
      (p.memo || '').toLowerCase().includes(q)
    );
  });

  const addAddress = () => {
    if (!newEntry.address) return;
    setAddressBook([...addressBook, { ...newEntry }]);
    setNewEntry({ name: '', address: '' });
  };

  const removeAddress = (addr) => setAddressBook(addressBook.filter((a) => a.address !== addr));

  const handleSend = (e) => {
    e.preventDefault();
    setConfirming(true);
  };

  const confirmSend = () => {
    // For safety, simulate sending here. Real sending requires building + signing transactions.
    setConfirming(false);
    setSend({ dest: '', amount: '', asset: 'XLM' });
    alert('Transaction simulated: Sent ' + send.amount + ' ' + send.asset + ' to ' + send.dest);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Bonus Features</h2>
        <button
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        >
          Toggle {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-medium">Account</h3>
          <div className="text-sm break-all">{publicKey || 'Not connected'}</div>
          {publicKey && (
              <div className="mt-3 flex items-center space-x-4">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="qr" width={120} height={120} />
                ) : (
                  <div className="w-30 h-30 bg-gray-100" />
                )}
              </div>
            )}
          <div className="mt-3">
            <h4 className="font-medium">Balances</h4>
            <ul className="text-sm">
              {balances.map((b, i) => (
                <li key={i}>{b.asset_type === 'native' ? 'XLM' : b.asset_code}: {b.balance}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-2 p-4 border rounded">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-medium">Transactions</h3>
            <input
              placeholder="Search transactions"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-2 py-1 border rounded text-sm"
            />
          </div>

          <div className="mb-4">
            <Line data={chartData} />
          </div>

          <div className="max-h-60 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th>When</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td>{new Date(p.created_at).toLocaleString()}</td>
                    <td className="break-all">{p.from}</td>
                    <td className="break-all">{p.to}</td>
                    <td>{p.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h3 className="font-medium">Address Book</h3>
          <div className="flex space-x-2 mt-2">
            <input placeholder="Name" value={newEntry.name} onChange={(e)=>setNewEntry({...newEntry, name: e.target.value})} className="px-2 py-1 border rounded flex-1" />
            <input placeholder="Address" value={newEntry.address} onChange={(e)=>setNewEntry({...newEntry, address: e.target.value})} className="px-2 py-1 border rounded flex-1" />
            <button onClick={addAddress} className="px-3 py-1 bg-blue-500 text-white rounded">Add</button>
          </div>
          <ul className="mt-3 text-sm">
            {addressBook.map((a) => (
              <li key={a.address} className="flex items-center justify-between">
                <div>{a.name}: <span className="break-all">{a.address}</span></div>
                <div className="space-x-2">
                  <button onClick={()=>setSend({...send, dest: a.address})} className="text-sm px-2 py-1 bg-gray-200 rounded">Use</button>
                  <button onClick={()=>removeAddress(a.address)} className="text-sm px-2 py-1 bg-red-200 rounded">Del</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-medium">Send (simulated)</h3>
          <form onSubmit={handleSend} className="space-y-2 mt-2">
            <input placeholder="Destination" value={send.dest} onChange={(e)=>setSend({...send, dest: e.target.value})} className="w-full px-2 py-1 border rounded" />
            <input placeholder="Amount" value={send.amount} onChange={(e)=>setSend({...send, amount: e.target.value})} className="w-full px-2 py-1 border rounded" />
            <div className="flex justify-end">
              <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded">Send</button>
            </div>
          </form>

          {confirming && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-11/12 md:w-1/3">
                <h4 className="font-semibold">Confirm Transaction</h4>
                <p className="text-sm mt-2">Send {send.amount} {send.asset} to {send.dest}?</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button onClick={()=>setConfirming(false)} className="px-3 py-1 border rounded">Cancel</button>
                  <button onClick={confirmSend} className="px-3 py-1 bg-blue-600 text-white rounded">Confirm</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BonusFeatures;
