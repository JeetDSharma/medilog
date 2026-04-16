const Doctor = require("../models/doctorModel")

exports.listDoctors = async (req, res, next) => {
  let listDoctor
  try {
    listDoctor = await Doctor.find()
    console.log(listDoctor)
  } catch (err) {
    console.log(err)
  }
  res.send(listDoctor)
}
exports.addDoctor = async (req, res, next) => {
  const {
    DoctorName,
    walletAddress,
    DOB,
    emailID,
    phoneNumber,
    speciality,
    doctorRegNo,
  } = req.body
  console.log(req.body)
  const doctor = new Doctor({
    DoctorName: DoctorName,
    walletAddress: walletAddress,
    DOB: DOB,
    emailID: emailID,
    phoneNumber: phoneNumber,
    speciality: speciality,
    doctorRegNo: doctorRegNo,
  })
  doctor
    .save()
    .then((result) => {
      console.log("Doctor Added")
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })
  res.send("Doctor Added")
}

exports.deleteDoctor = async (req, res, next) => {
  const _id = req.body
  try {
    console.log(_id)
    await Doctor.findByIdAndDelete(_id)
  } catch (err) {
    console.log(err)
  }
  res.send("Doctor Deleted")
}

exports.updateDoctor = async (req, res, next) => {
  const _id = req.body._id
  const {
    DoctorName,
    walletAddress,
    DOB,
    emailID,
    phoneNumber,
    speciality,
    doctorRegNo,
  } = req.body
  try {
    console.log(_id, " is being updated")
    await Doctor.findByIdAndUpdate(_id, {
      DoctorName: DoctorName,
      walletAddress: walletAddress,
      DOB: DOB,
      emailID: emailID,
      phoneNumber: phoneNumber,
      speciality: speciality,
      doctorRegNo: doctorRegNo,
    })
  } catch (err) {
    console.log(err)
  }
  res.send("Doctor Updated")
}
exports.getDoctorById = async (req, res, next) => {
  const _id = req.body._id
  let doctor
  try {
    doctor = await Doctor.findById(_id)
    console.log(doctor)
    res.send(doctor)
  } catch (err) {
    console.log(err)
    res.send("Doctor Not Found")
  }
}

exports.getDoctorDetailByWallet = async (req, res, next) => {
  const walletAddress = req.body.walletAddress
  let doctor
  try {
    doctor = await Doctor.findOne({ walletAddress: walletAddress })
    console.log(doctor)
    res.send(doctor)
  } catch (err) {
    console.log(err)
    res.send("Doctor Not Found")
  }
}
