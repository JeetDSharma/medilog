/**
 * Seeds MongoDB with demo users and medicines for screenshots / demos.
 *
 * Uses Hardhat’s default local accounts (same mnemonic as `npx hardhat node`).
 * Import account #0 private key in MetaMask to act as the first manufacturer, etc.
 *
 * Usage (from backend/, after `cd backend`):
 *   node scripts/seed-demo-data.js              # clears lists, then inserts (recommended)
 *   node scripts/seed-demo-data.js --append     # insert without clearing (may duplicate)
 *
 * Requires backend/.env with MONGOCONNECTIONURL (same as App.js).
 */

const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "..", ".env") })

const mongoose = require("mongoose")

const Patient = require("../models/patientModel.js")
const Doctor = require("../models/doctorModel.js")
const Pharmacy = require("../models/pharmacyModel.js")
const Manufacturer = require("../models/manufacturerModel.js")
const Medicines = require("../models/medicineModel.js")

/** Hardhat default account addresses (account index → address). */
const A = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  "0x976EA74026E726554d657457C13632cEDef078c0",
  "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
  "0x23618e81E3f5cd7f1142BDa0C8032A6AF6b7d1C0",
  "0xa0Ee7A142d267C1f36714E4a3F99B9B61B5B39D8",
]

const manufacturers = [
  {
    manufacturerID: "MFG-1001",
    ManufacturerName: "NovaForm Therapeutics Pvt. Ltd.",
    walletAddress: A[0],
    emailID: "contact@novaform.demo",
    phoneNumber: "+91 22 4001 2200",
    address: "Plot 12, MIDC Industrial Area, Pune, Maharashtra 411019",
  },
  {
    manufacturerID: "MFG-1002",
    ManufacturerName: "Zenith BioLabs Ltd.",
    walletAddress: A[1],
    emailID: "sales@zenithbiolabs.demo",
    phoneNumber: "+91 80 2555 8800",
    address: "88 Electronics City Phase 1, Bengaluru, Karnataka 560100",
  },
]

const doctors = [
  {
    DoctorName: "Dr. Ananya Sharma",
    walletAddress: A[2],
    DOB: "1985-03-14",
    emailID: "ananya.sharma@cityhospital.demo",
    phoneNumber: "+91 98765 43210",
    speciality: "Internal Medicine",
    doctorRegNo: "MMC/REG/2010/88421",
  },
  {
    DoctorName: "Dr. Rohan Mehta",
    walletAddress: A[3],
    DOB: "1979-11-02",
    emailID: "rohan.mehta@heartcare.demo",
    phoneNumber: "+91 98100 11223",
    speciality: "Cardiology",
    doctorRegNo: "DMC/REG/2007/12004",
  },
  {
    DoctorName: "Dr. Priya Nair",
    walletAddress: A[4],
    DOB: "1990-07-22",
    emailID: "priya.nair@pediatrics.demo",
    phoneNumber: "+91 99887 76655",
    speciality: "Pediatrics",
    doctorRegNo: "KMC/REG/2015/55201",
  },
]

const pharmacies = [
  {
    pharmacyID: "PHR-5001",
    PharmacyName: "WellSpring Pharmacy — Andheri",
    walletAddress: A[5],
    emailID: "andheri@wellspring.demo",
    phoneNumber: "+91 22 2640 7788",
    address: "Shop 4, SV Road, Andheri West, Mumbai 400058",
  },
  {
    pharmacyID: "PHR-5002",
    PharmacyName: "MediCare Plus — Koramangala",
    walletAddress: A[6],
    emailID: "koramangala@medicareplus.demo",
    phoneNumber: "+91 80 2555 0099",
    address: "No. 21, 5th Block, Koramangala, Bengaluru 560095",
  },
]

const patients = [
  {
    patientName: "Vikram Singh",
    walletAddress: A[7],
    DOB: "1996-01-18",
    emailID: "vikram.singh@email.demo",
    phoneNumber: "+91 91234 56789",
    patientDescription: "Seasonal allergies; no chronic conditions.",
    aadharCard: "XXXX-XXXX-4521",
  },
  {
    patientName: "Meera Iyer",
    walletAddress: A[8],
    DOB: "1988-09-05",
    emailID: "meera.iyer@email.demo",
    phoneNumber: "+91 93456 78901",
    patientDescription: "Hypertension — on maintenance therapy.",
    aadharCard: "XXXX-XXXX-9012",
  },
  {
    patientName: "Arjun Patel",
    walletAddress: A[9],
    DOB: "2001-12-30",
    emailID: "arjun.patel@email.demo",
    phoneNumber: "+91 94567 89012",
    patientDescription: "Athletic build; routine checkups only.",
    aadharCard: "XXXX-XXXX-3344",
  },
]

const medicines = [
  {
    MedicineID: "MED-001",
    MedicineName: "Amoxicillin Capsules",
    MedicinePower: "500 mg",
    MedicineDrugs: "Amoxicillin (as trihydrate)",
    MRP: "₹ 189",
    SideEffects: "Nausea, diarrhea, rash (rare).",
  },
  {
    MedicineID: "MED-002",
    MedicineName: "Atorvastatin Tablets",
    MedicinePower: "20 mg",
    MedicineDrugs: "Atorvastatin calcium",
    MRP: "₹ 142",
    SideEffects: "Muscle pain, liver enzyme changes.",
  },
  {
    MedicineID: "MED-003",
    MedicineName: "Paracetamol Tablets",
    MedicinePower: "650 mg",
    MedicineDrugs: "Paracetamol",
    MRP: "₹ 32",
    SideEffects: "Rare skin reactions at high dose.",
  },
  {
    MedicineID: "MED-004",
    MedicineName: "Azithromycin Tablets",
    MedicinePower: "500 mg",
    MedicineDrugs: "Azithromycin",
    MRP: "₹ 98",
    SideEffects: "GI upset, QT prolongation (caution).",
  },
  {
    MedicineID: "MED-005",
    MedicineName: "Metformin ER Tablets",
    MedicinePower: "1000 mg",
    MedicineDrugs: "Metformin hydrochloride",
    MRP: "₹ 76",
    SideEffects: "GI discomfort, B12 deficiency long-term.",
  },
  {
    MedicineID: "MED-006",
    MedicineName: "Salbutamol Inhaler",
    MedicinePower: "100 mcg/actuation",
    MedicineDrugs: "Salbutamol sulfate",
    MRP: "₹ 215",
    SideEffects: "Tremor, tachycardia.",
  },
  {
    MedicineID: "MED-007",
    MedicineName: "Omeprazole Capsules",
    MedicinePower: "40 mg",
    MedicineDrugs: "Omeprazole",
    MRP: "₹ 54",
    SideEffects: "Headache, vitamin B12 absorption.",
  },
  {
    MedicineID: "MED-008",
    MedicineName: "Levocetirizine Tablets",
    MedicinePower: "5 mg",
    MedicineDrugs: "Levocetirizine dihydrochloride",
    MRP: "₹ 41",
    SideEffects: "Drowsiness, dry mouth.",
  },
]

async function clearAll() {
  await Promise.all([
    Patient.deleteMany({}),
    Doctor.deleteMany({}),
    Pharmacy.deleteMany({}),
    Manufacturer.deleteMany({}),
    Medicines.deleteMany({}),
  ])
  console.log("Cleared patients, doctors, pharmacies, manufacturers, medicines.")
}

async function seed() {
  const url = process.env.MONGOCONNECTIONURL
  if (!url) {
    console.error("Missing MONGOCONNECTIONURL in backend/.env")
    process.exit(1)
  }

  const appendOnly = process.argv.includes("--append")
  await mongoose.connect(url)

  if (!appendOnly) {
    await clearAll()
  }

  const inserted = {
    manufacturers: (await Manufacturer.insertMany(manufacturers)).length,
    doctors: (await Doctor.insertMany(doctors)).length,
    pharmacies: (await Pharmacy.insertMany(pharmacies)).length,
    patients: (await Patient.insertMany(patients)).length,
    medicines: (await Medicines.insertMany(medicines)).length,
  }

  console.log("Demo seed complete:", inserted)
  console.log("")
  console.log("Wallet ↔ role (Hardhat default accounts 0–9) for MetaMask:")
  console.log("  [0] Manufacturer — NovaForm Therapeutics")
  console.log("  [1] Manufacturer — Zenith BioLabs")
  console.log("  [2] Doctor — Dr. Ananya Sharma")
  console.log("  [3] Doctor — Dr. Rohan Mehta")
  console.log("  [4] Doctor — Dr. Priya Nair")
  console.log("  [5] Pharmacy — WellSpring Andheri")
  console.log("  [6] Pharmacy — MediCare Plus Koramangala")
  console.log("  [7] Patient — Vikram Singh")
  console.log("  [8] Patient — Meera Iyer")
  console.log("  [9] Patient — Arjun Patel")
  console.log("")
  console.log("Re-run without --append to replace all seeded rows.")

  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
