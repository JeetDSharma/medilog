const mongoose = require('mongoose')
const schema = mongoose.Schema

const PatientSchema = new schema({
  patientName: { type: String, reqire: true },
  walletAddress: { type: String, require: true },
  DOB: { type: String, require: true },
  emailID: { type: String },
  phoneNumber: { type: String },
  patientDescription: { type: String },
  aadharCard: { type: String },
})

module.exports = Patient = mongoose.model('Patient', PatientSchema)
