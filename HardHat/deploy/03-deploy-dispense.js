const {
    networkConfigMedicine,
    networkConfigPrescribe,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let medicineAddress
    let prescribeAddress
    // if (chainId == 31337) {
    const medicineObj = await deployments.get("Medicine")
    const prescribeObj = await deployments.get("Prescription")
    medicineAddress = medicineObj.address
    prescribeAddress = prescribeObj.address
    console.log(`medicine address: ${medicineAddress}`)
    console.log(`prescribe address: ${prescribeAddress}`)

    // }
    // else {
    //     medicineAddress = networkConfigMedicine[chainId][medicineAddress]
    //     prescribeAddress = networkConfigMedicine[chainId][prescribeAddress]
    // }
    const dispense = await deploy("DispenseMedicine", {
        from: deployer,
        args: [medicineAddress, prescribeAddress],
        log: true,
    })
    log("Deployed Dispense!")
}

module.exports.tags = ["prescribe"]
