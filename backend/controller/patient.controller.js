const Patient = require("../models/patientModel.js")

exports.listPatients = async (req, res, next) => {
  let listPatients
  try {
    listPatients = await Patient.find()
    console.log(listPatients)
  } catch (err) {
    console.log(err)
  }
  res.send(listPatients)
}
exports.addPatient = async (req, res, next) => {
  const {
    patientName,
    walletAddress,
    DOB,
    emailID,
    phoneNumber,
    patientDescription,
    aadharCard,
  } = req.body
  console.log(req.body)
  const patient = new Patient({
    patientName: patientName,
    walletAddress: walletAddress,
    DOB: DOB,
    emailID: emailID,
    phoneNumber: phoneNumber,
    patientDescription: patientDescription,
    aadharCard: aadharCard,
  })
  patient
    .save()
    .then((result) => {
      console.log("Patient Added")
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })
  res.send("Patient Added")
}

exports.deletePatient = async (req, res, next) => {
  const _id = req.body
  try {
    console.log(_id)
    await Patient.findByIdAndDelete(_id)
  } catch (err) {
    console.log(err)
  }
  res.send("Patient Deleted")
}
exports.updatePatient = async (req, res, next) => {
  const _id = req.body._id
  const {
    patientName,
    walletAddress,
    DOB,
    emailID,
    phoneNumber,
    patientDescription,
    aadharCard,
  } = req.body
  try {
    console.log(_id)
    await Patient.findByIdAndUpdate(_id, {
      patientName: patientName,
      walletAddress: walletAddress,
      DOB: DOB,
      emailID: emailID,
      phoneNumber: phoneNumber,
      patientDescription: patientDescription,
      aadharCard: aadharCard,
    })
  } catch (err) {
    console.log(err)
  }
  res.send("Patient Updated")
}
exports.getPatientById = async (req, res, next) => {
  const _id = req.body._id
  let patient
  try {
    patient = await Patient.findById(_id)
    console.log(patient)
    res.send(patient)
  } catch (err) {
    console.log(err)
    res.send("Patient Not Found")
  }
}

exports.getPatientDetailByWallet = async (req, res, next) => {
  const walletAddress = req.body.walletAddress
  let patient
  try {
    patient = await Patient.findOne({ walletAddress: walletAddress })
    console.log(patient)
    res.send(patient)
  } catch (err) {
    console.log(err)
    res.send("Patient Not Found")
  }
}
