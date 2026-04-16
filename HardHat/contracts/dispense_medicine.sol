// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

interface IMedicine {
    function addMedicine(
        uint256 _serialNo,
        uint256 _medicineID,
        uint256 _manufacturerID,
        uint256 _manufacturingDate,
        uint256 _expiryDate,
        uint256 _MRP
    ) external;

    function getManufactuerInventory(
        uint256 _serialNo
    ) external view returns (bool);

    function updateManufacturerInventory(uint256 _serialNo) external;

    function getMedicineDetails(
        uint256 _serialNo
    )
        external
        view
        returns (uint256, uint256, uint256, uint256, uint256, uint256);

    function getSerialNoToMedicineID(
        uint256 _medicineDispensed
    ) external view returns (uint256);

    function getMedicineMRP(uint256 _serialNo) external view returns (uint256);

    function getMedicineExpiry(
        uint256 _serialNo
    ) external view returns (uint256);

    function getMedicineExists(
        uint256 _medicineID
    ) external view returns (bool);

    function updateMedicineStatus(uint256[] memory _medicineDispensed) external;

    function getValidManufacturer(
        address _manufacturerAdd
    ) external view returns (bool);

    function getValidSerialNo(uint256 _serailNo) external view returns (bool);

    function addManufacturer(address _manufacturerAdd) external;

    function onlyManufacturer() external view returns (bool);

    function onlyOwner() external view returns (bool);

    function uniqueSerialNo(uint256 _serialNo) external view returns (bool);
}

interface IPrescription {
    struct PrescriptionDetails {
        uint256 doctorID;
        uint256 prescriptionID;
        uint256[] medicineID;
        uint256 dateOfIssue;
        uint256 validityPeriod;
        address payable patientAdd;
        address doctorAdd;
        mapping(uint256 => bool) medicineExistsInPrescription;
    }

    function addPrescription(
        uint256 _prescriptionID,
        uint256 _doctorID,
        uint256[] memory _medicineID,
        uint256 _dateOfIssue,
        uint256 _validityPeriod,
        address payable _patientAdd
    ) external;

    function payToDoctor(
        address payable _doctorAdd,
        uint _amount
    ) external payable;

    function checkMedicineInPrescription(
        uint256 _prescriptionID,
        uint256 _medicineID
    ) external view returns (bool);

    function getPrescriptionDetails(
        uint256 _prescriptionID
    )
        external
        view
        returns (
            uint256 doctorID,
            uint256[] memory medicineID,
            uint256 dateOfIssue,
            uint256 validityPeriod,
            address patientAdd,
            address doctorAdd
        );

    function addDoctor(address _doctorAdd) external;

    function getDoctorExists(address _doctorAdd) external view returns (bool);

    function getPrescriptionIDExists(
        uint256 _prescriptionID
    ) external view returns (bool);
}

contract DispenseMedicine {
    address owner;

    address medicineAddress;
    address prescribeAddress;
    IMedicine medicine;
    IPrescription prescription;

    constructor(address medicineAdd, address prescribeAdd) {
        owner = msg.sender;
        medicineAddress = medicineAdd;
        prescribeAddress = prescribeAdd;
        medicine = IMedicine(medicineAddress);
        prescription = IPrescription(prescribeAddress);
    }

    struct DispenseDetails {
        uint256 dispenseID;
        uint256 pharmacyRegNo;
        uint256[] medicineDispensed;
        uint256[] priceOfSale;
        uint256 dateOfDispense;
        address payable patientWallet;
    }

    mapping(uint256 => DispenseDetails) public dispenseList;
    mapping(address => bool) public pharmacyExists;
    mapping(uint256 => bool) public dispenseIDExists;
    mapping(uint256 => address) public dispenseToPaitent;
    mapping(uint256 => address) public dispenseToPharmacy;

    mapping(uint256 => bool) public pharmacyInventory;

    // [
    //     4978,
    //     7896,
    //     9879,
    //     [6546],
    //     1647724800,
    //     80,
    //     0xdD870fA1b7C4700F2BD7f44238821C26f7392148
    // ]

    function dispense(
        uint256 _prescriptionID,
        uint256 _dispenseID,
        uint256 _pharmacyRegNo,
        uint256[] memory _medicineDispensed,
        uint256 _dateOfDispense,
        uint256[] memory _priceOfSale,
        address payable _patientWallet
    )
        public
        onlyPharmacy
        uniqueDispense(_dispenseID)
        medicineCheck(
            _priceOfSale,
            _medicineDispensed,
            _dateOfDispense,
            _prescriptionID
        )
    {
        dispenseList[_dispenseID].dispenseID = _dispenseID;
        dispenseList[_dispenseID].pharmacyRegNo = _pharmacyRegNo;
        dispenseList[_dispenseID].medicineDispensed = _medicineDispensed;
        dispenseList[_dispenseID].dateOfDispense = _dateOfDispense;
        dispenseList[_dispenseID].priceOfSale = _priceOfSale;
        dispenseList[_dispenseID].patientWallet = _patientWallet;

        medicine.updateMedicineStatus(_medicineDispensed);
    }

    function getValidPharmacy(address _pharmacyAdd) public view returns (bool) {
        return (pharmacyExists[_pharmacyAdd]);
    }

    function getDispenseDetails(
        uint256 _dispenseID
    )
        public
        view
        onlyPaitentTodispense(_dispenseID)
        onlyPharmacyTodispense(_dispenseID)
        returns (uint256, uint256[] memory, uint256, uint256[] memory, address)
    {
        return (
            dispenseList[_dispenseID].pharmacyRegNo,
            dispenseList[_dispenseID].medicineDispensed,
            dispenseList[_dispenseID].dateOfDispense,
            dispenseList[_dispenseID].priceOfSale,
            dispenseList[_dispenseID].patientWallet
        );
    }

    function payToPharmacy(
        address payable _pharmacyAdd,
        uint _amount
    ) external payable {
        (bool success, ) = _pharmacyAdd.call{value: _amount}("");
        require(success, "Failed to send Ether");
    }

    function addPharmacy(address _pharmacyAdd) public onlyOwner {
        pharmacyExists[_pharmacyAdd] = true;
    }

    function getPharmacyInventory(
        uint256 _serialNo
    ) public view returns (bool) {
        return (pharmacyInventory[_serialNo]);
    }

    function updatePharmacyInventory(uint256 _serialNo) public {
        pharmacyInventory[_serialNo] = !pharmacyInventory[_serialNo];
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the Owner!");
        _;
    }
    modifier onlyPharmacy() {
        require(pharmacyExists[msg.sender], "You are not a pharmacy!");
        _;
    }
    modifier uniqueDispense(uint256 _dispenseID) {
        require(
            dispenseIDExists[_dispenseID] == false,
            "dispenseID aldready exisits!"
        );
        _;
    }
    modifier onlyPaitentTodispense(uint256 _dispenseID) {
        require(
            dispenseToPaitent[_dispenseID] == msg.sender,
            "Wrong dispense ID!"
        );
        _;
    }
    modifier onlyPharmacyTodispense(uint256 _dispenseID) {
        require(
            dispenseToPharmacy[_dispenseID] == msg.sender,
            "Wrong dispense ID!"
        );
        _;
    }

    modifier medicineCheck(
        uint256[] memory _priceOfSale,
        uint256[] memory _medicineDispensed,
        uint256 _dateOfDispense,
        uint256 _prescriptionID
    ) {
        for (uint256 i = 0; i < _medicineDispensed.length; i++) {
            if (
                prescription.checkMedicineInPrescription(
                    _prescriptionID,
                    medicine.getSerialNoToMedicineID(_medicineDispensed[i])
                ) != true
            ) {
                revert("Medicine Not Found in Prescription!");
            }
            if (medicine.getValidSerialNo(_medicineDispensed[i]) != true) {
                revert("Not a valid Medicine!");
            }
            if (
                _priceOfSale[i] > medicine.getMedicineMRP(_medicineDispensed[i])
            ) {
                revert("Price More the MRP!");
            }
            if (_dateOfDispense > medicine.getMedicineExpiry(_dateOfDispense)) {
                revert("Medicine is Expired!");
            }
        }
        _;
    }
}
