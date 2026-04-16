const express = require("express")
const route = express.Router()

const doctorController = require("../controller/doctor.controller.js")
const medicineController = require("../controller/medicine.controller.js")
const manufacturerController = require("../controller/manufacturer.controller.js")
const pharmacyController = require("../controller/pharmacy.controller.js")
const patientController = require("../controller/patient.controller.js")

// Medicine Page
route.get("/api/medicinelist", medicineController.listMedicines)
route.post("/api/medicineAdd", medicineController.addMedicine)
route.post('/api/medicineDelete', medicineController.deleteMedicine)
route.post('/api/medicineUpdate', medicineController.updateMedicine)
route.post("/api/medicineGetDetails", medicineController.getMedicineById)
// Doctors Page
route.get("/api/doctorlist", doctorController.listDoctors)
route.post("/api/doctorAdd", doctorController.addDoctor)
route.post("/api/doctorDelete", doctorController.deleteDoctor)
route.post("/api/doctorUpdate", doctorController.updateDoctor)
route.post("/api/doctorGetDetails", doctorController.getDoctorById)
route.post("/api/doctorGetDetailByWallet", doctorController.getDoctorDetailByWallet)
// Manufacturers Page
route.get("/api/manufacturerlist", manufacturerController.listManufacturers)
route.post("/api/manufacturerAdd", manufacturerController.addManufacturer)
route.post("/api/manufacturerDelete", manufacturerController.deleteManufacturer)
route.post("/api/manufacturerUpdate", manufacturerController.updateManufacturer)
route.post("/api/manufacturerGetDetails", manufacturerController.getManufacturerById)
route.post("/api/manufacturerGetDetailByWallet", manufacturerController.getManufacturerDetailByWallet)
// Pharmacy Page
route.get("/api/pharmacylist", pharmacyController.listPharmacies)
route.post("/api/pharmacyAdd", pharmacyController.addPharmacy)
route.post("/api/pharmacyDelete", pharmacyController.deletePharmacy)
route.post("/api/pharmacyUpdate", pharmacyController.updatePharmacy)
route.post("/api/pharmacyGetDetails", pharmacyController.getPharmacyById)
route.post("/api/pharmacyGetDetailByWallet", pharmacyController.getPharmacyDetailByWallet)
// Patient Page
route.get("/api/patientlist", patientController.listPatients)
route.post("/api/patientAdd", patientController.addPatient)
route.post("/api/patientDelete", patientController.deletePatient)
route.post("/api/patientUpdate", patientController.updatePatient)
route.post("/api/patientGetDetails", patientController.getPatientById)
route.post("/api/patientGetDetailByWallet", patientController.getPatientDetailByWallet)

module.exports = route
