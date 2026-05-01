# Gatling Token ICO Sale

A decentralized application (DApp) for an Initial Coin Offering (ICO) of Gatling Token (GAT), built on Ethereum.

## Overview

Gatling Token Sale is a project that demonstrates how to create a custom ERC-20 token and a crowdsale contract to sell it. The project includes a smart contract for the token, a smart contract for the sale, and a web interface for users to participate in the sale.

## Features

- **ERC-20 Token**: Implements the standard ERC-20 interface (name, symbol, totalSupply, balance, transfer, approve, transferFrom).
- **Token Sale Contract**: Handles the distribution of tokens in exchange for Ether at a fixed price.
- **Admin Controls**: Allows the admin to end the sale and collect the remaining tokens and Ether.
- **Responsive UI**: A simple web interface built with Bootstrap to interact with the smart contracts.
- **MetaMask Integration**: Connects to the Ethereum blockchain using MetaMask.

## Technologies Used

- **Solidity**: Smart contract programming language.
- **Truffle**: Development framework for Ethereum.
- **Ganache**: Local blockchain for testing.
- **Web3.js**: JavaScript library to interact with the Ethereum blockchain.
- **Bootstrap**: UI framework for the frontend.
- **Lite-Server**: A lightweight development server.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [Truffle](https://www.trufflesuite.com/truffle) (`npm install -g truffle`)
- [Ganache](https://www.trufflesuite.com/ganache)
- [MetaMask](https://metamask.io/) browser extension

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd gatling-token-sale
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Rinkeby credentials (if deploying to Rinkeby):
   ```
   MNEMONIC="your mnemonic here"
   INFURA_API_KEY="your infura api key here"
   ```

## Usage

### Local Development

1. Start Ganache (GUI or CLI) on port `7545`.

2. Compile and migrate the smart contracts:
   ```bash
   truffle migrate --reset
   ```

3. Run the tests:
   ```bash
   truffle test
   ```

4. Launch the frontend:
   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000`. Ensure MetaMask is connected to your local Ganache network.

### Rinkeby Deployment

1. Ensure you have Ether in your Rinkeby account.

2. Deploy to Rinkeby:
   ```bash
   truffle migrate --network rinkeby
   ```

## Project Structure

- `contracts/`: Solidity smart contracts.
- `migrations/`: Scripts for deploying contracts.
- `test/`: JavaScript tests for smart contracts.
- `src/`: Frontend source code (HTML, CSS, JS).
- `truffle-config.js`: Truffle configuration file.

## License

This project is licensed under the ISC License.
