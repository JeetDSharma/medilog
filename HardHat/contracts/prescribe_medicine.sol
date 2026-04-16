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

contract Prescription {
    address owner;
    address medicineAddress;

    IMedicine medicine;

    constructor(address medicineAdd) {
        owner = msg.sender;
        medicineAddress = medicineAdd;
        medicine = IMedicine(medicineAddress);
    }

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
    mapping(uint256 => PrescriptionDetails) public prescriptionList;
    mapping(address => bool) public doctorExists;
    mapping(uint256 => address) public prescriptionToPaitent;
    mapping(uint256 => address) public prescriptionToDoctor;
    mapping(uint256 => bool) public prescriptionIDExists;

    // [
    //     6482,
    //     4978,
    //     [7987],
    //     1647724800,
    //     1647724800,
    //     0xdD870fA1b7C4700F2BD7f44238821C26f7392148
    // ]

    function addPrescription(
        uint256 _prescriptionID,
        uint256 _doctorID,
        uint256[] memory _medicineID,
        uint256 _dateOfIssue,
        uint256 _validityPeriod,
        address payable _patientAdd
    )
        public
        onlyDoctor
        validMedicine(_medicineID)
        uniquePrescription(_prescriptionID)
    {
        prescriptionList[_prescriptionID].prescriptionID = _prescriptionID;
        prescriptionList[_prescriptionID].doctorID = _doctorID;
        prescriptionList[_prescriptionID].medicineID = _medicineID;
        prescriptionList[_prescriptionID].dateOfIssue = _dateOfIssue;
        prescriptionList[_prescriptionID].validityPeriod = _validityPeriod;
        prescriptionList[_prescriptionID].patientAdd = _patientAdd;
        prescriptionList[_prescriptionID].doctorAdd = msg.sender;

        prescriptionToPaitent[_prescriptionID] = _patientAdd;
        prescriptionToDoctor[_prescriptionID] = msg.sender;

        for (uint256 i = 0; i < _medicineID.length; i++) {
            prescriptionList[_prescriptionID].medicineExistsInPrescription[
                    _medicineID[i]
                ] = true;
        }
    }

    function payToDoctor(
        address payable _doctorAdd,
        uint _amount
    ) external payable {
        (bool success, ) = _doctorAdd.call{value: _amount}("");
        require(success, "Failed to send Ether");
    }

    function checkMedicineInPrescription(
        uint256 _prescriptionID,
        uint256 _medicineID
    ) public view returns (bool) {
        return
            prescriptionList[_prescriptionID].medicineExistsInPrescription[
                _medicineID
            ];
    }

    function getPrescriptionDetails(
        uint256 _prescriptionID
    )
        public
        view
        returns (
            // onlyPaitentToprescription(_prescriptionID)
            // onlyDoctorToprescription(_prescriptionID)
            uint256,
            uint256[] memory,
            uint256,
            uint256,
            address,
            address
        )
    {
        return (
            prescriptionList[_prescriptionID].doctorID,
            prescriptionList[_prescriptionID].medicineID,
            prescriptionList[_prescriptionID].dateOfIssue,
            prescriptionList[_prescriptionID].validityPeriod,
            prescriptionList[_prescriptionID].patientAdd,
            prescriptionList[_prescriptionID].doctorAdd
        );
    }

    // function getMedicineInPrescreption(uint256 _prescreptionID) public view returns (mapping(uint256))
    // {
    //     return (
    //         prescriptionList[_prescreptionID].medicineID
    //     );
    // }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the Owner!");
        _;
    }

    function addDoctor(address _doctorAdd) public onlyOwner {
        doctorExists[_doctorAdd] = true;
    }

    modifier onlyDoctor() {
        require(doctorExists[msg.sender], "You are not a Doctor!");
        _;
    }
    modifier uniquePrescription(uint256 _prescriptionID) {
        require(
            prescriptionIDExists[_prescriptionID] == false,
            "prescriptionID aldready exisits!"
        );
        _;
    }
    modifier onlyPaitentToprescription(uint256 _prescriptionID) {
        require(
            prescriptionToPaitent[_prescriptionID] == msg.sender ||
                prescriptionToDoctor[_prescriptionID] == msg.sender,
            "Wrong prescription ID!"
        );
        _;
    }
    // modifier onlyDoctorToprescription(uint256 _prescriptionID) {
    //     require(
    //         prescriptionToDoctor[_prescriptionID] == msg.sender,
    //         "Wrong prescription ID!"
    //     );
    //     _;
    // }
    modifier validMedicine(uint256[] memory _medicineID) {
        for (uint256 i = 0; i < _medicineID.length; i++) {
            if (medicine.getMedicineExists(_medicineID[i]) != true) {
                revert("Not a valid Medicine!");
            }
        }
        _;
    }
}
