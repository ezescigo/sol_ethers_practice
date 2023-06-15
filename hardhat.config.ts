import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@nomicfoundation/hardhat-verify"
import "dotenv/config"
import "./tasks/block-number"

const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_ALCHEMY_URL ?? process.env.SEPOLIA_RPC_URL

const PRIVATE_KEY = process.env.PRIVATE_KEY ?? ""
const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY ?? ""

const config: HardhatUserConfig = {
    solidity: "0.8.7",
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: ETHERSCAN_KEY,
    },
}

export default config
