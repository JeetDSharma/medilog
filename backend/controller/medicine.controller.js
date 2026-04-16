const Medicines = require('../models/medicineModel')

exports.listMedicines = async (req, res, next) => {
  let listMedicines
  try {
    listMedicines = await Medicines.find().lean()
    console.log(listMedicines)
  } catch (err) {
    console.log(err)
  }
  res.send(listMedicines)
}

exports.addMedicine = async (req, res, next) => {
  const {
    MedicineID,
    MedicineName,
    MedicinePower,
    MedicineDrugs,
    MRP,
    SideEffects,
  } = req.body

  const medicine = new Medicines({
    MedicineID: MedicineID,
    MedicineName: MedicineName,
    MedicinePower: MedicinePower,
    MedicineDrugs: MedicineDrugs,
    MRP: MRP,
    SideEffects: SideEffects,
  })
  medicine
    .save()
    .then((result) => {
      console.log('Medicine Added')
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })
  res.send("Medicine Added")
}

exports.deleteMedicine = async (req, res, next) => {
  const _id = req.body
  try {
    console.log(_id)
    await Medicines.findByIdAndDelete(_id)
  } catch (err) {
    console.log(err)
  }
  res.send("Medicine Deleted")
}
exports.updateMedicine = async (req, res, next) => {
  const _id = req.body._id
  const {
    MedicineID,
    MedicineName,
    MedicinePower,
    MedicineDrugs,
    MRP,
    SideEffects,
  } = req.body
  try {
    console.log(_id)
    await Medicines.findByIdAndUpdate(_id, {
      MedicineID: MedicineID,
      MedicineName: MedicineName,
      MedicinePower: MedicinePower,
      MedicineDrugs: MedicineDrugs,
      MRP: MRP,
      SideEffects: SideEffects,
    })
  } catch (err) {
    console.log(err)
  }
  res.send("Medicine Updated")
}
exports.getMedicineById = async (req, res, next) => {
  const _id = req.body._id
  let medicine
  try {
    medicine = await Medicine.findById(_id)
    console.log(medicine)
    res.send(medicine)
  } catch (err) {
    console.log(err)
    res.send("Medicine Not Found")
  }
}