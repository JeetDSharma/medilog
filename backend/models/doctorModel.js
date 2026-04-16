const mongoose = require('mongoose')
const schema = mongoose.Schema

const DoctorSchema = new schema({
  DoctorName: { type: String, reqire: true },
  walletAddress: { type: String, require: true },
  DOB: { type: String, require: true },
  emailID: { type: String },
  phoneNumber: { type: String },
  speciality: { type: String },
  doctorRegNo: { type: String },
})

module.exports = Doctor = mongoose.model('Doctor', DoctorSchema)
