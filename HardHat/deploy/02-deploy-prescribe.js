const { networkConfigMedicine } = require("../helper-hardhat-config")
const { ethers } = require("ethers")
const { network } = require("hardhat")
require("dotenv").config()
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let medicineAddress

    // if (chainId == 31337) {
    const medicineObj = await deployments.get("Medicine")
    medicineAddress = medicineObj.address
    console.log(`medicine address: ${medicineAddress}`)
    // }
    // else {
    //     medicineAddress = networkConfigMedicine[chainId][medicineAddress]
    // }
    const prescription = await deploy("Prescription", {
        from: deployer,
        args: [medicineAddress],
        log: true,
    })
    log("Deployed Prescribe!")
}

module.exports.tags = ["prescribe"]
