const mongoose = require('mongoose')
const schema = mongoose.Schema

const MedicineSchema = new schema({
  MedicineID: { type: String, require: true },
  MedicineName: { type: String, reqire: true },
  MedicinePower: { type: String, require: true },
  MedicineDrugs: { type: String, require: true },
  MRP: { type: String, require: true },
  SideEffects: { type: String },
})

module.exports = Medicine = mongoose.model('Medicines', MedicineSchema)
