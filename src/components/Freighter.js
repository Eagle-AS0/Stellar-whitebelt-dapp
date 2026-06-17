import { signTransaction, setAllowed, getPublicKey } from '@stellar/freighter-api';
import * as StellarSdk from '@stellar/stellar-sdk';

const getServer = (horizonUrl) => new StellarSdk.Horizon.Server(horizonUrl);

const checkConnection = async () => {
    return await setAllowed();
};

const retrievePublicKey = async () => {
    return await getPublicKey();
};

const getBalance = async () => {
    await setAllowed();
    const address = await getPublicKey();
    const publicServer = getServer('https://horizon.stellar.org');
    const testnetServer = getServer('https://horizon-testnet.stellar.org');

    const loadBalanceFromServer = async (server) => {
        const account = await server.loadAccount(address);
        const nativeBal = account.balances.find((b) => b.asset_type === 'native');
        return nativeBal?.balance ?? '0';
    };

    const isNotFound = (err) => {
        const status = err?.response?.status ?? err?.status;
        const name = err?.name ?? (err && err.constructor && err.constructor.name);
        return name === 'NotFoundError' || status === 404 || err?.message?.includes('Not Found');
    };

    try {
        return await loadBalanceFromServer(publicServer);
    } catch (err) {
        if (!isNotFound(err)) throw err;
    }

    try {
        return await loadBalanceFromServer(testnetServer);
    } catch (err) {
        if (isNotFound(err)) return '0';
        throw err;
    }
};

const userSignTransaction = async (xdr, network, signWith) => {
    return await signTransaction(xdr, { network, accountToSign: signWith });
};

export { checkConnection, retrievePublicKey, getBalance, userSignTransaction };