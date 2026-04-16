// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "./medicine.sol";
import "./dispense_medicine.sol";

contract Manufacturer_Sale {
    address owner;

    address medicineAddress;
    address dispenseAddress;

    constructor(address medicineAdd, address dispenseAdd) {
        owner = msg.sender;
        medicineAddress = medicineAdd;
        dispenseAddress = dispenseAdd;
    }

    Medicine medicine = Medicine(medicineAddress);
    DispenseMedicine dispense = DispenseMedicine(dispenseAddress);

    struct ManufacturerSaleDetails {
        address manufacturerAddress;
        uint256 saleID;
        uint256[] medicineSerialNoList;
        uint256[] priceOfSale;
        address payable pharmacyWallet;
    }

    mapping(uint256 => ManufacturerSaleDetails) public ManufacturerSaleList;

    function sale(
        uint256 _saleID,
        uint256[] memory _medicineSerialNoList,
        uint256[] memory _priceOfSale,
        address payable _pharmacyWallet
    )
        public
        onlyManufacturer
        validMedicine(_medicineSerialNoList, _priceOfSale)
        validPharmacy(_pharmacyWallet)
    {
        ManufacturerSaleList[_saleID].manufacturerAddress = msg.sender;
        ManufacturerSaleList[_saleID].saleID = _saleID;
        ManufacturerSaleList[_saleID]
            .medicineSerialNoList = _medicineSerialNoList;
        ManufacturerSaleList[_saleID].priceOfSale = _priceOfSale;
        ManufacturerSaleList[_saleID].pharmacyWallet = _pharmacyWallet;

        for (uint256 i = 0; i < _medicineSerialNoList.length; i++) {
            medicine.updateManufacturerInventory(_medicineSerialNoList[i]);
            dispense.updatePharmacyInventory(_medicineSerialNoList[i]);
        }
    }

    function getSaleDetials(
        uint256 _saleID
    )
        public
        view
        returns (uint256, uint256[] memory, uint256[] memory, address payable)
    {
        return (
            ManufacturerSaleList[_saleID].saleID,
            ManufacturerSaleList[_saleID].medicineSerialNoList,
            ManufacturerSaleList[_saleID].priceOfSale,
            ManufacturerSaleList[_saleID].pharmacyWallet
        );
    }

    modifier onlyManufacturer() {
        require(
            medicine.getValidManufacturer(msg.sender) == true,
            "You are not a Manufacturer!"
        );
        _;
    }
    modifier validPharmacy(address _pharmacyWallet) {
        require(
            dispense.getValidPharmacy(_pharmacyWallet) == true,
            "reciever is not a valid Pharmacy!"
        );
        _;
    }
    modifier validMedicine(
        uint256[] memory _medicineSerialNoList,
        uint256[] memory _priceOfSale
    ) {
        for (uint256 i = 0; i < _medicineSerialNoList.length; i++) {
            if (medicine.getValidSerialNo(_medicineSerialNoList[i]) != true) {
                revert("Medicine does not exsist!");
            }
            if (
                medicine.getMedicineMRP(_medicineSerialNoList[i]) >
                _priceOfSale[i]
            ) {
                revert("Price of Sale Greater than MRP!");
            }
        }
        _;
    }
}
