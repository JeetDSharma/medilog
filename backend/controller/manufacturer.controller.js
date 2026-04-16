const Manufacturer = require("../models/manufacturerModel")

exports.listManufacturers = async (req, res, next) => {
  let listManufacturers
  try {
    listManufacturers = await Manufacturer.find()
    console.log(listManufacturers)
  } catch (err) {
    console.log(err)
  }
  res.send(listManufacturers)
}
exports.addManufacturer = async (req, res, next) => {
  const { manufacturerID, ManufacturerName, walletAddress, emailID, phoneNumber, address } =
    req.body
  console.log(req.body)
  const manufacturer = new Manufacturer({
    manufacturerID: manufacturerID,
    ManufacturerName: ManufacturerName,
    walletAddress: walletAddress,
    emailID: emailID,
    phoneNumber: phoneNumber,
    address: address,
  })
  manufacturer
    .save()
    .then((result) => {
      console.log("Manufacturer Added")
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })
  res.send("Manufacturer Added")
}
exports.deleteManufacturer = async (req, res, next) => {
  const _id = req.body
  try {
    console.log(_id)
    await Manufacturer.findByIdAndDelete(_id)
  } catch (err) {
    console.log(err)
  }
  res.send("Manufacturer Deleted")
}

exports.updateManufacturer = async (req, res, next) => {
  const _id = req.body._id
  const { manufacturerID, ManufacturerName, walletAddress, emailID, phoneNumber, address } =
    req.body
  try {
    console.log(_id)
    await Manufacturer.findByIdAndUpdate(_id, {
      manufacturerID: manufacturerID,
      ManufacturerName: ManufacturerName,
      walletAddress: walletAddress,
      emailID: emailID,
      phoneNumber: phoneNumber,
      address: address,
    })
  } catch (err) {
    console.log(err)
  }
  res.send("Manufacturer Updated")
}
exports.getManufacturerById = async (req, res, next) => {
  const _id = req.body._id
  let manufacturer
  try {
    manufacturer = await Manufacturer.findById(_id)
    console.log(manufacturer)
    res.send(manufacturer)
  } catch (err) {
    console.log(err)
    res.send("Manufacturer Not Found")
  }
}
exports.getManufacturerDetailByWallet = async (req, res, next) => {
  const walletAddress = req.body.walletAddress
  let manufacturer
  try {
    manufacturer = await Manufacturer.findOne({
      walletAddress: walletAddress,
    })
    console.log(manufacturer)
    res.send(manufacturer)
  } catch (err) {
    console.log(err)
    res.send("Manufacturer Not Found")
  }
}
