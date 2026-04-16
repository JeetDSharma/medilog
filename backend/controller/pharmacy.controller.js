const Pharmacy = require("../models/pharmacyModel.js")

exports.listPharmacies = async (req, res, next) => {
  let listPharmacies
  try {
    listPharmacies = await Pharmacy.find()
    console.log(listPharmacies)
  } catch (err) {
    console.log(err)
  }
  res.send(listPharmacies)
}
exports.addPharmacy = async (req, res, next) => {
  const { pharmacyID, PharmacyName, walletAddress, emailID, phoneNumber, address } =
    req.body
  console.log(req.body)
  const pharmacy = new Pharmacy({
    pharmacyID: pharmacyID,
    PharmacyName: PharmacyName,
    walletAddress: walletAddress,
    emailID: emailID,
    phoneNumber: phoneNumber,
    address: address,
  })
  pharmacy
    .save()
    .then((result) => {
      console.log("Pharmacy Added")
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })
  res.send("Pharmacy Added")
}

exports.deletePharmacy = async (req, res, next) => {
  const _id = req.body
  try {
    console.log(_id)
    await Pharmacy.findByIdAndDelete(_id)
  } catch (err) {
    console.log(err)
  }
  res.send("Pharmacy Deleted")
}

exports.updatePharmacy = async (req, res, next) => {
  const _id = req.body._id
  const { pharmacyID, PharmacyName, walletAddress, emailID, phoneNumber, address } =
    req.body
  try {
    console.log(_id)
    await Pharmacy.findByIdAndUpdate(_id, {
      pharmacyID: pharmacyID,
      PharmacyName: PharmacyName,
      walletAddress: walletAddress,
      emailID: emailID,
      phoneNumber: phoneNumber,
      address: address,
    })
  } catch (err) {
    console.log(err)
  }
  res.send("Pharmacy Updated")
}
exports.getPharmacyById = async (req, res, next) => {
  const _id = req.body._id
  let pharmacy
  try {
    pharmacy = await Pharmacy.findById(_id)
    console.log(pharmacy)
    res.send(pharmacy)
  } catch (err) {
    console.log(err)
    res.send("Pharmacy Not Found")
  }
}

exports.getPharmacyDetailByWallet = async (req, res, next) => {
  const walletAddress = req.body.walletAddress
  let pharmacy
  try {
    pharmacy = await Pharmacy.findOne({ walletAddress: walletAddress })
    console.log(pharmacy)
    res.send(pharmacy)
  } catch (err) {
    console.log(err)
    res.send("Pharmacy Not Found")
  }
}
