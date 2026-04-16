require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("dotenv").config()
require("solidity-coverage")
/** @type import('hardhat/config').HardhatUserConfig */

const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY || ""
const GORELI_RPC_URL = process.env.GORELI_RPC_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const POLYGON_MUMBAI_KEY = process.env.POLYGON_MUMBAI_KEY || ""
const POLYGON_MUMBAI_RPC_URL = process.env.POLYGON_MUMBAI_RPC_URL || ""
// const POLYGON_MAINNET_RPC_URL = process.env.POLYGON_MAINNET_RPC_URL || ""

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    // goreli: {
    //     url: GORELI_RPC_URL,
    //     accounts: [PRIVATE_KEY],
    //     chainId: 5,
    // },
    // polygon_mumbai: {
    //     url: POLYGON_MUMBAI_RPC_URL,
    //     accounts: [PRIVATE_KEY],
    //     chainId: 80001,
    // },
    // polygon: {
    //     url: POLYGON_MAINNET_RPC_URL,
    //     accounts: [PRIVATE_KEY],
    //     chainId: 137  ,
    // },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      //80001: 2
    },
    // user: {
    //     default: 1,
    // },
  },
  solidity: "0.8.8",
}
