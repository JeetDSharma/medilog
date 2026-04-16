//imports

const { ethers } = require("ethers")
const { network } = require("hardhat")
const { verify } = require("../utils/verify.js")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const medicine = await deploy("Medicine", {
        from: deployer,
        args: [],
        log: true,
    })
    log("Deployed Medicine!")
    // if (network.config.chainId != 31337 && process.env.POLYSCAN_API_KEY) {
    //     await verify(medicine.address, [])
    // }
}

module.exports.tags = ["medicine"]
