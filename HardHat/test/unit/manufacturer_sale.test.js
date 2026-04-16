// const { ethers } = require("hardhat")
// const { assert, expect } = require("chai")

// describe("Manufacturer Sale", function () {
//     let manufacturerSale
//     let medicine
//     beforeEach(async function () {
//         const [owner, manufacturer, doctor, pharmacy, paitent] =
//             await ethers.getSigners()
//         const medicineFactory = await ethers.getContractFactory("Medicine")
//         medicine = await medicineFactory.deploy(owner.getAddress())
//         const manufacturerSaleFactory = await ethers.getContractFactory(
//             "Manufacturer_Sale"
//         )
//         manufacturerSale = await manufacturerSaleFactory.deploy(
//             medicine.address,
//             owner.getAddress()
//         )
//         const serialNo = 1234
//         const medicineID = 5678
//         const manufacturerID = 9012
//         const manufacturingDate = 1647724800 // March 18, 2022
//         const expiryDate = 1689260800 // October 12, 2023
//         const MRP = 100
//         await medicine.addManufacturer(manufacturer.getAddress())
//         const medicineManufacturer = medicine.connect(manufacturer)
//         await medicineManufacturer.addMedicine(
//             serialNo,
//             medicineID,
//             manufacturerID,
//             manufacturingDate,
//             expiryDate,
//             MRP,
//             manufacturer.getAddress()
//         )
//     })
//     describe("sale()", function () {
//         it("check that only manufacturer can create a sale", async function () {
//             const [owner, manufacturer, doctor, pharmacy, paitent] =
//                 await ethers.getSigners()
//             const saleID = 1
//             const medicineSerialNoList = [1234]
//             const priceOfSale = [50]
//             const pharmacytWallet = pharmacy.getAddress()
//             const manufacturerSalePharmacy =
//                 manufacturerSale.connect(manufacturer)
//             await expect(
//                 manufacturerSalePharmacy.sale(
//                     saleID,
//                     medicineSerialNoList,
//                     priceOfSale,
//                     manufacturer.getAddress()
//                 )
//             ).to.be.revertedWith("You are not a Manufacturer!")

//             // const [owner, manufacturer, doctor, pharmacy, paitent] =
//             //     await ethers.getSigners()
//             // const saleID = 1
//             // const medicineSerialNoList = [123]
//             // const priceOfSale = [50]
//             // const pharmacyWallet = pharmacy.getAddress()
//             // const saleManufacturer = manufacturerSale.connect(manufacturer)
//             // saleManufacturer.sale(
//             //     saleID,
//             //     medicineSerialNoList,
//             //     priceOfSale,
//             //     pharmacyWallet,
//             //     manufacturer.getAddress()
//             // )
//             // const response = saleManufacturer.getSaleDetails(saleID)
//             // assert.equal(response[0], saleID)
//             // assert.equal(response[1], medicineSerialNoList)
//             // assert.equal(response[2], priceOfSale)
//             // assert.equal(response[3], pharmacyWallet)
//         })
//     })
// })
