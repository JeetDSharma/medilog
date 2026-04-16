const mongoose = require('mongoose')
const schema = mongoose.Schema

const ManufacturerSchema = new schema({
  manufacturerID: { type: String, require: true },
  ManufacturerName: { type: String, reqire: true },
  walletAddress: { type: String, require: true },
  emailID: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
})

module.exports = Manufacturer = mongoose.model(
  'Manufacturer',
  ManufacturerSchema,
)
