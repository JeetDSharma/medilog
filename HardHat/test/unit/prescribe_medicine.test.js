const { ethers } = require("hardhat")
const { assert, expect } = require("chai")
const { keccak256 } = require("ethers/lib/utils")

describe("medicine", function () {
    let medicine, medicineFactory, prescribe, prescribeFactory
    beforeEach(async function () {
        const [owner, manufacturer, doctor, pharmacy, paitent] =
            await ethers.getSigners()
        medicineFactory = await ethers.getContractFactory("Medicine")
        medicine = await medicineFactory.deploy(owner.getAddress())
        await medicine.deployed()
        medicine.addManufacturer(manufacturer.getAddress())
        medicineManufacturer = medicine.connect(manufacturer)
        medicineManufacturer.addMedicine(
            10,
            20,
            6879,
            1647724800,
            1689260800,
            100
        )
        medicineManufacturer.addMedicine(
            30,
            40,
            8949,
            1647724800,
            1689260800,
            100
        )
        prescribeFactory = await ethers.getContractFactory("Prescription")
        console.log(medicine.address)
        console.log(ethers.utils.getAddress(medicine.address))
        prescribe = await prescribeFactory.deploy(
            ethers.utils.getAddress(medicine.address),
            owner.getAddress()
        )
        // console.log(prescribe)
    })
    describe("addDoctor()", function () {
        it("Fails if sender is not owner", async function () {
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            const prescribeeManufacturer = prescribe.connect(doctor)

            await expect(
                prescribeeManufacturer.addDoctor(manufacturer.getAddress())
            ).to.be.revertedWith("You are not the Owner!")
        })
        it("Fails if Doctor is not added", async function () {
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            await prescribe.addDoctor(doctor.getAddress())
            const result = await prescribe.doctorExists(doctor.getAddress())
            assert.equal(result, true)
        })
    })
    describe("addPrescription()", function () {
        beforeEach(async function () {
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            await prescribe.addDoctor(doctor.getAddress())
        })
        it("should add a prescription", async function () {
            const [owner, manufacturer, doctor, pharmacy, paitent] =
                await ethers.getSigners()
            // Create a mock prescription
            const prescriptionID = 1
            const doctorID = 8956
            const medicineID = [20, 41]
            const dateOfIssue = Date.now()
            const validityPeriod = 30
            const paitentAdd = paitent.getAddress()

            // Add prescription to the contract
            const prescribeDoctor = prescribe.connect(doctor)
            await prescribeDoctor.addPrescription(
                prescriptionID,
                doctorID,
                medicineID,
                dateOfIssue,
                validityPeriod,
                paitentAdd
            )
            // Check prescription details
            const prescriptionDetails = await prescribe.getPrescriptionDetails(
                prescriptionID
            )
            assert.equal(prescriptionDetails[0], doctorID)
            for (let i = 0; i < medicineID.length; i++) {
                assert.equal(prescriptionDetails[1][i], medicineID[i])
            }
            assert.equal(prescriptionDetails[2], dateOfIssue)
            assert.equal(prescriptionDetails[3], validityPeriod)
            assert.equal(prescriptionDetails[4], paitent.address)
            assert.equal(prescriptionDetails[5], doctor.address)
        })
    })
})
