// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract Medicine {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    struct MedicineDetails {
        uint256 serialNo;
        uint256 medicineID;
        uint256 manufacturerID;
        uint256 manufacturingDate;
        uint256 expiryDate;
        uint256 MRP;
    }

    mapping(uint256 => MedicineDetails) public medicineList;
    mapping(address => bool) public manufacturerExists;
    mapping(uint256 => bool) public medicineExists;
    mapping(uint256 => bool) public serialNoExists;
    mapping(uint256 => bool) public medicineUsed;
    mapping(uint256 => uint256) public serialNoToMedicineID;
    mapping(uint256 => bool) public manufacturerInventory;

    // [
    // 6546,
    // 7987,
    // 10,
    // 1647724800,
    // 1689260800,
    // 100
    // ]
    // [
    // 9871,
    // 8912,
    // 20,
    // 1647724801,
    // 1689260801,
    // 100
    // ]

    function addMedicine(
        uint256 _serialNo,
        uint256 _medicineID,
        uint256 _manufacturerID,
        uint256 _manufacturingDate,
        uint256 _expiryDate,
        uint256 _MRP
    ) public onlyManufacturer uniqueSerialNo(_serialNo) {
        medicineExists[_medicineID] = true;
        serialNoExists[_serialNo] = true;
        medicineList[_serialNo].serialNo = _serialNo;
        medicineList[_serialNo].medicineID = _medicineID;
        medicineList[_serialNo].manufacturerID = _manufacturerID;
        medicineList[_serialNo].manufacturingDate = _manufacturingDate;
        medicineList[_serialNo].expiryDate = _expiryDate;
        medicineList[_serialNo].MRP = _MRP;

        serialNoToMedicineID[_serialNo] = _medicineID;
        //adds to inventory
        manufacturerInventory[_serialNo] = true;
    }

    function getManufactuerInventory(
        uint256 _serialNo
    ) public view returns (bool) {
        return (manufacturerInventory[_serialNo]);
    }

    function updateManufacturerInventory(uint256 _serialNo) public {
        manufacturerInventory[_serialNo] = !manufacturerInventory[_serialNo];
    }

    function getMedicineDetails(
        uint256 _serialNo
    )
        public
        view
        returns (uint256, uint256, uint256, uint256, uint256, uint256)
    {
        return (
            medicineList[_serialNo].serialNo,
            medicineList[_serialNo].medicineID,
            medicineList[_serialNo].manufacturerID,
            medicineList[_serialNo].manufacturingDate,
            medicineList[_serialNo].expiryDate,
            medicineList[_serialNo].MRP
        );
    }

    function getSerialNoToMedicineID(
        uint256 _medicineDispensed
    ) public view returns (uint256) {
        return (serialNoToMedicineID[_medicineDispensed]);
    }

    function getMedicineMRP(uint256 _serialNo) public view returns (uint256) {
        return (medicineList[_serialNo].MRP);
    }

    function getMedicineExpiry(
        uint256 _serialNo
    ) public view returns (uint256) {
        return (medicineList[_serialNo].expiryDate);
    }

    function getMedicineExists(uint256 _medicineID) public view returns (bool) {
        return (medicineExists[_medicineID]);
    }

    //Updates Serial ID of dispensed medicine as true
    function updateMedicineStatus(uint256[] memory _medicineDispensed) public {
        for (uint256 i = 0; i < _medicineDispensed.length; i++)
            medicineUsed[_medicineDispensed[i]] = true;
    }

    function getValidManufacturer(
        address _manufacturerAdd
    ) public view returns (bool) {
        return (manufacturerExists[_manufacturerAdd]);
    }

    function getValidSerialNo(uint256 _serailNo) public view returns (bool) {
        return (serialNoExists[_serailNo]);
    }

    function addManufacturer(address _manufacturerAdd) public onlyOwner {
        manufacturerExists[_manufacturerAdd] = true;
    }

    modifier onlyManufacturer() {
        require(
            manufacturerExists[msg.sender] == true,
            "You are not a Manufacturer!"
        );
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the Owner!");
        _;
    }
    modifier uniqueSerialNo(uint256 _serialNo) {
        require(serialNoExists[_serialNo] != true, "Serial ID id not unique!");
        _;
    }
}
