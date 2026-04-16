const mongoose = require('mongoose')
const schema = mongoose.Schema

const PharmacySchema = new schema({
  pharmacyID: { type: String, require: true },
  PharmacyName: { type: String, reqire: true },
  walletAddress: { type: String, require: true },
  emailID: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
})

module.exports = Pharmacy = mongoose.model('Pharmacy', PharmacySchema)
