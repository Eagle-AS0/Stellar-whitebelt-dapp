import React, { useState } from 'react';
import { checkConnection, retrievePublicKey, getBalance } from './Freighter';

const Header = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [publicKey, setPublicKey] = useState('');
    const [balance, setBalance] = useState('0');

    const connectWallet = async () => {
        try {
            const allowed = await checkConnection();
            if (!allowed) return alert('Permission denied.');
            const key = await retrievePublicKey();
            const bal = await getBalance();
            setPublicKey(key);
            setBalance(parseFloat(bal).toFixed(2));
            setIsConnected(true);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>{isConnected ? 'Connected' : 'Connect Wallet'}</button>
            <div>Public Key: {publicKey}</div>
            <div>Balance: {balance}</div>
        </div>
    );
};

export default Header;