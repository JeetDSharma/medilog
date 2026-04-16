/**
 * One-time refactor: Header + Row + SideBar + Col -> DashboardLayout
 */
const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..")

const mapping = [
  [ "pages/adminPages/AddAPharmacy.js", "admin" ],
  [ "pages/adminPages/EditProfilePharmacy.js", "admin" ],
  [ "pages/adminPages/EditProfileDoctor.js", "admin" ],
  [ "pages/adminPages/MedicineView.js", "admin" ],
  [ "pages/adminPages/PharmacyView.js", "admin" ],
  [ "pages/adminPages/DoctorView.js", "admin" ],
  [ "pages/adminPages/EditProfileManufacturer.js", "admin" ],
  [ "pages/adminPages/AddAManufacturer.js", "admin" ],
  [ "pages/adminPages/AddAPatient.js", "admin" ],
  [ "pages/adminPages/ManufacturerView.js", "admin" ],
  [ "pages/adminPages/AddADoctor.js", "admin" ],
  [ "pages/adminPages/PatientView.js", "admin" ],
  [ "pages/adminPages/EditProfilePatient.js", "admin" ],
  [ "pages/patient/PatientProfile.js", "patient" ],
  [ "pages/patient/PatientViewPrescriptionList.js", "patient" ],
  [ "pages/patient/PatientQR.js", "patient" ],
  [ "pages/patient/PatientCheckMedicine.js", "patient" ],
  [ "pages/patient/patientpurchasehistory.js", "patient" ],
  [ "pages/doctor/DoctorMedicineView.js", "doctor" ],
  [ "pages/doctor/DoctorProfile.js", "doctor" ],
  [ "pages/doctor/DoctorGivePrescription.js", "doctor" ],
  [ "pages/doctor/DoctorPatientCheck.js", "doctor" ],
  [ "pages/pharmacy/PharmacyPatientCheck.js", "pharmacy" ],
  [ "pages/pharmacy/PharmacyProfile.js", "pharmacy" ],
  [ "pages/pharmacy/PharmacySellToPatient.js", "pharmacy" ],
  [ "pages/pharmacy/PharmacyViewMedicines.js", "pharmacy" ],
  [ "pages/manufacturer/EditProfileMedicine.js", "manufacturer" ],
  [ "pages/manufacturer/ManufacturerViewMedicine.js", "manufacturer" ],
  [ "pages/manufacturer/ManufacturerAddDrug.js", "manufacturer" ],
  [ "pages/manufacturer/AddAMedicine.js", "manufacturer" ],
  [ "pages/manufacturer/ManufacturerInventory.js", "manufacturer" ],
  [ "pages/manufacturer/ManufacturerSellToPharmacy.js", "manufacturer" ],
  [ "pages/manufacturer/ManufacturerCreateBill.js", "manufacturer" ],
  [ "pages/manufacturer/ManufacturerProduceMedicine.js", "manufacturer" ],
  [ "pages/manufacturer/ManufacturerProfile.js", "manufacturer" ],
]

function addDashboardLayoutImport(c) {
  if (c.includes("DashboardLayout")) return c
  const bootstrapRe =
    /(import\s+['"]bootstrap\/dist\/css\/bootstrap\.min\.css['"];?\s*\r?\n)/
  if (bootstrapRe.test(c)) {
    return c.replace(
      bootstrapRe,
      `$1import DashboardLayout from "../../components/DashboardLayout"\n`
    )
  }
  return c.replace(
    /(import\s+React[^\n]*\n)/,
    `$1import DashboardLayout from "../../components/DashboardLayout"\n`
  )
}

const openRe =
  /return\s*\(\s*<>\s*<Header\s*\/>\s*<Row className=\{\s*styles\.mainContainerDashRow\s*\}>\s*<SideBar\s*\/>\s*<Col className=\{\s*styles\.mainContainerDashCol\s*\}>/

const closeRe = /(<\/Container>)\s*<\/Col>\s*<\/Row>\s*<\/>/

for (const [ rel, role ] of mapping) {
  const file = path.join(root, rel)
  let c = fs.readFileSync(file, "utf8")

  c = c.replace(/^import\s+Header\s+from\s+['"][^'"]+['"];?\s*\r?\n/gm, "")
  c = c.replace(/^import\s+SideBar\s+from\s+['"][^'"]+['"];?\s*\r?\n/gm, "")

  c = addDashboardLayoutImport(c)

  if (!openRe.test(c)) {
    console.error("OPEN pattern failed:", rel)
    process.exitCode = 1
    continue
  }
  c = c.replace(
    openRe,
    `return (\n    <DashboardLayout role="${ role }">`
  )

  if (!closeRe.test(c)) {
    console.error("CLOSE pattern failed:", rel)
    process.exitCode = 1
    continue
  }
  c = c.replace(closeRe, "$1\n    </DashboardLayout>")

  fs.writeFileSync(file, c)
  console.log("OK", rel)
}
