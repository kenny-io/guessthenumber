# GuessTheNumber Smart Contract

This project demonstrates a simple Ethereum smart contract game called "GuessTheNumber" using the Hardhat development environment. Players can guess a secret number, and if correct, they win a prize.

## Project Structure

- `contracts/`: Contains the Solidity smart contracts
  - `GuessTheNumber.sol`: The main game contract
- `scripts/`: Contains deployment scripts
  - `deploy.js`: Script to deploy the GuessTheNumber contract
- `test/`: Contains test files for the contracts
  - `GuessTheNumber.js`: Tests for the GuessTheNumber contract
- `hardhat.config.js`: Hardhat configuration file

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd guess-game
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   INFURA_API_KEY=your_infura_api_key
   SEPOLIA_PRIVATE_KEY=your_sepolia_private_key
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

## Usage

### Running Tests

To run the tests for the GuessTheNumber contract

```bash
npx hardhat test
```

### Deploying the Contract

To deploy the GuessTheNumber contract to the Sepolia testnet:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Verifying on Etherscan

After deployment, you can verify the contract on Etherscan:

## Contract Functionality

The GuessTheNumber contract allows:
- The owner to start a new game with a secret number and bet amount
- Players to guess the number by sending the required bet amount
- Winners to receive a prize of double the bet amount

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.