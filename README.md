# Stellar White Belt dApp

A simple decentralized application (dApp) built on the Stellar Testnet that allows users to connect their Freighter wallet, view their XLM balance, and send XLM transactions securely. The project demonstrates the core fundamentals of Stellar development including wallet integration, balance retrieval, transaction signing, and transaction submission.

## Features

* Connect Freighter Wallet
* Fetch and display XLM balance
* Send XLM on Stellar Testnet
* Transaction confirmation modal
* Transaction search and history display
* Address book for frequent recipients
* Dark/Light theme toggle
* QR code for your Stellar address
* Responsive mobile-friendly UI

## Built With

* React
* Create React App
* Stellar SDK
* Freighter Wallet API
* Stellar Testnet

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
npm start
```

The application will be available on:

```text
http://localhost:3000
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
3. Click **Send**.
4. Confirm the transaction in Freighter Wallet.
5. View the transaction result.

## Future Improvements

* Full on-chain transaction signing with Freighter
* Multi-asset support
* Better transaction history pagination
* UI/UX refinements and animations

## Author

Built as a submission for the **Stellar Level 1 – White Belt Challenge**.
