Copy this into your `README.md` and replace the GitHub username/screenshots if needed.

# Stellar White Belt dApp

A simple decentralized application (dApp) built on the Stellar Testnet that allows users to connect their Freighter wallet, view their XLM balance, and send XLM transactions securely. The project demonstrates the core fundamentals of Stellar development including wallet integration, balance retrieval, transaction signing, and transaction submission. Stellar dApps commonly use frontend frameworks such as React together with Stellar wallet connectivity and transaction handling. ([Stellar Developers][1])

## Features

* Connect Freighter Wallet
* Disconnect Wallet
* Fetch and display XLM balance
* Send XLM on Stellar Testnet
* Display transaction success/failure status
* Display transaction hash after successful payment
* User-friendly interface with error handling

## Built With

* React
* Vite
* Stellar SDK
* Freighter Wallet API
* Stellar Testnet

## Project Requirements Completed

### Wallet Setup

* Freighter Wallet configured
* Connected to Stellar Testnet

### Wallet Connection

* Connect Wallet functionality
* Disconnect Wallet functionality

### Balance Handling

* Fetch account balance
* Display XLM balance in the UI

### Transaction Flow

* Send XLM transaction
* Transaction confirmation feedback
* Transaction hash display

### Development Standards

* Component-based React structure
* Error handling
* Wallet integration
* Stellar SDK transaction logic

## Installation

Clone the repository:

```bash
git clone https://github.com/Eagle-AS0/Stellar-whitebelt-dapp.git
```

Navigate to the project folder:

```bash
cd Stellar-whitebelt-dapp
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The application will be available on:

```text
http://localhost:5173
```

## How to Use

### Connect Wallet

1. Install Freighter Wallet.
2. Switch to Stellar Testnet.
3. Click **Connect Wallet**.
4. Approve the connection request.

### Check Balance

After connecting, the application automatically fetches and displays your XLM balance from the Stellar Testnet.

### Send XLM

1. Enter the recipient Stellar address.
2. Enter the amount of XLM.
3. Click **Send XLM**.
4. Approve the transaction in Freighter Wallet.
5. View the transaction result and transaction hash.

## Screenshots

### Wallet Connected

![Wallet Connected](./screenshots/wallet-connected.png)

### Balance Displayed

![Balance](./screenshots/balance.png)

### Send Transaction

![Send Transaction](./screenshots/send-transaction.png)

### Successful Transaction

![Transaction Success](./screenshots/transaction-success.png)

## Repository

[GitHub Repository](https://github.com/Eagle-AS0/Stellar-whitebelt-dapp?utm_source=chatgpt.com)

## Future Improvements

* Transaction history viewer
* QR code payments
* Multi-asset support
* Better UI/UX
* Mobile responsiveness

## Author

Built as a submission for the **Stellar Level 1 – White Belt Challenge**.

[1]: https://developers.stellar.org/docs/build/apps/dapp-frontend?utm_source=chatgpt.com "Build a dapp Frontend: Connect Wallets, Handle Transactions & More | Stellar Docs"
