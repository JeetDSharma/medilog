module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let medicineAddress
    // if (chainId == 31337) {
    const medicineObj = await deployments.get("Medicine")
    medicineAddress = medicineObj.address
    const dispenseObj = await deployments.get("DispenseMedicine")
    dispenseAddress = dispenseObj.address
    console.log(`medicine address: ${medicineAddress}`)

    // }
    // else {
    //     medicineAddress = networkConfigMedicine[chainId][medicineAddress]
    //     prescribeAddress = networkConfigMedicine[chainId][prescribeAddress]
    // }
    const sale = await deploy("Manufacturer_Sale", {
        from: deployer,
        args: [medicineAddress, dispenseAddress],
        log: true,
    })
    log("Deployed Manufacturer Sale!")
}

module.exports.tags = ["sale"]
