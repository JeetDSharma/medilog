const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("medicine", function () {
    let medicine, medicineFactory
    beforeEach(async function () {
        //deploy medicine
        //using hardhat-deploy
        const [owner, manufacturer, doctor, pharmacy, paitent] =
            await ethers.getSigners()
        medicineFactory = await ethers.getContractFactory("Medicine")
        medicine = await medicineFactory.deploy(owner.getAddress())
        // const res = await medicine.deployed()
        // console.log(res)
    })
    describe("addManufactuer()", function () {
        it("Fails if sender is not owner", async function () {
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            const medicineManufacturer = medicine.connect(manufacturer)

            await expect(
                medicineManufacturer.addManufacturer(manufacturer.getAddress())
            ).to.be.revertedWith("You are not the Owner!")
        })
        it("Fails if Manufacturer is not added", async function () {
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            await medicine.addManufacturer(manufacturer.getAddress())
            const result = await medicine.manufacturerExists(
                manufacturer.getAddress()
            )
            assert.equal(result, true)
        })
    })
    describe("addMedicine()", function () {
        beforeEach(async function () {
            //deploy medicine
            //using hardhat-deploy
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            console.log()
            await medicine.addManufacturer(manufacturer.getAddress())
        })
        it("Fails if Medicines not added", async function () {
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            const serialNo = 1234
            const medicineID = 5678
            const manufacturerID = 9012
            const manufacturingDate = 1647724800 // March 18, 2022
            const expiryDate = 1689260800 // October 12, 2023
            const MRP = 100
            const medicineManufacturer = medicine.connect(manufacturer)
            // console.log(signerContract.signer.address)
            // console.log(medicine.signer.address)
            await medicineManufacturer.addMedicine(
                serialNo,
                medicineID,
                manufacturerID,
                manufacturingDate,
                expiryDate,
                MRP
            )
            const medicineDetails =
                await medicineManufacturer.getMedicineDetails(serialNo)
            assert.equal(medicineDetails[0], serialNo)
            assert.equal(medicineDetails[1], medicineID)
            assert.equal(medicineDetails[2], manufacturerID)
            assert.equal(medicineDetails[3], manufacturingDate)
            assert.equal(medicineDetails[4], expiryDate)
            assert.equal(medicineDetails[5], MRP)
        })
        it("Fails if Serial No is not Unique", async function () {
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            const serialNo = 1234
            const medicineID = 5678
            const manufacturerID = 9012
            const manufacturingDate = 1647724800 // March 18, 2022
            const expiryDate = 1689260800 // October 12, 2023
            const MRP = 100
            const medicineManufacturer = medicine.connect(manufacturer)
            await medicineManufacturer.addMedicine(
                serialNo,
                medicineID,
                manufacturerID,
                manufacturingDate,
                expiryDate,
                MRP
            )
            await expect(
                medicineManufacturer.addMedicine(
                    serialNo,
                    medicineID,
                    manufacturerID,
                    manufacturingDate,
                    expiryDate,
                    MRP
                )
            ).to.be.revertedWith("Serial ID id not unique!")
        })
        it("Fails if sender is not manufacturer", async function () {
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            const serialNo = 1234
            const medicineID = 5678
            const manufacturerID = 9012
            const manufacturingDate = 1647724800 // March 18, 2022
            const expiryDate = 1689260800 // October 12, 2023
            const MRP = 100
            await expect(
                medicine.addMedicine(
                    serialNo,
                    medicineID,
                    manufacturerID,
                    manufacturingDate,
                    expiryDate,
                    MRP
                )
            ).to.be.revertedWith("You are not a Manufacturer!")
        })
    })
    describe("View Function tests", function () {
        beforeEach(async function () {
            //deploy medicine
            //using hardhat-deploy
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            await medicine.addManufacturer(manufacturer.getAddress())
            const serialNo = 1234
            const medicineID = 5678
            const manufacturerID = 9012
            const manufacturingDate = 1647724800 // March 18, 2022
            const expiryDate = 1689260800 // October 12, 2023
            const MRP = 100
            const medicineManufacturer = medicine.connect(manufacturer)
            await medicineManufacturer.addMedicine(
                serialNo,
                medicineID,
                manufacturerID,
                manufacturingDate,
                expiryDate,
                MRP
            )
        })
        it("checks if manufacturer is not valid", async function () {
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            const response1 = await medicine.getValidManufacturer(
                doctor.getAddress()
            )
            const response2 = await medicine.getValidManufacturer(
                manufacturer.getAddress()
            )
            assert.equal(response1, false)
            assert.equal(response2, true)
        })
        it("fails if medicine MRP returned is wrong", async function () {
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            const MRP = 100
            const serialNo = 1234
            const medicineManufacturer = medicine.connect(manufacturer)
            const response = await medicineManufacturer.getMedicineMRP(
                serialNo,
                manufacturer.getAddress()
            )
            assert.equal(response, MRP)
        })
        it("fails if medicine Expiry returned is wrong", async function () {
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            const expiryDate = 1689260800 // October 12, 2023
            const serialNo = 1234
            const medicineManufacturer = medicine.connect(manufacturer)
            const response = await medicineManufacturer.getMedicineExpiry(
                serialNo,
                manufacturer.getAddress()
            )
            assert.equal(response, expiryDate)
        })
        it("fails if serial id is not valid", async function () {
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            const medicineManufacturer = medicine.connect(manufacturer)
            const serialNo = 1234
            const response = await medicineManufacturer.getValidSerialNo(
                serialNo,
                manufacturer.getAddress()
            )
            assert.equal(response, true)
        })
    })
    describe("(Valid Medicine Check)", function () {
        beforeEach(async function () {
            //deploy medicine
            //using hardhat-deploy
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            await medicine.addManufacturer(manufacturer.getAddress())
            const serialNo = 1234
            const medicineID = 5678
            const manufacturerID = 9012
            const manufacturingDate = 1647724800 // March 18, 2022
            const expiryDate = 1689260800 // October 12, 2023
            const MRP = 100
            const medicineManufacturer = medicine.connect(manufacturer)
            await medicineManufacturer.addMedicine(
                serialNo,
                medicineID,
                manufacturerID,
                manufacturingDate,
                expiryDate,
                MRP
            )
            await medicineManufacturer.addMedicine(
                serialNo + 1,
                medicineID + 1,
                manufacturerID + 1,
                manufacturingDate + 1,
                expiryDate + 1,
                MRP + 1
            )
        })
        it("fails if medicine status is not updated as true", async function () {
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            const medicineManufacturer = medicine.connect(manufacturer)
            const serialNo1 = 1234
            const serialNo2 = 1235
            await medicineManufacturer.updateMedicineStatus(
                [serialNo1],
                manufacturer.getAddress()
            )
            const response1 = await medicine.medicineUsed(
                serialNo1,
                manufacturer.getAddress()
            )
            const response2 = await medicine.medicineUsed(
                serialNo2,
                manufacturer.getAddress()
            )
            assert.equal(response1, true)
            assert.equal(response2, false)
        })
    })
})
