export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_manufacturerAdd",
        type: "address",
      },
    ],
    name: "addManufacturer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_serialNo",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_medicineID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_manufacturerID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_manufacturingDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_expiryDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_MRP",
        type: "uint256",
      },
    ],
    name: "addMedicine",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_serialNo",
        type: "uint256",
      },
    ],
    name: "getMedicineDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_serialNo",
        type: "uint256",
      },
    ],
    name: "getMedicineExpiry",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_serialNo",
        type: "uint256",
      },
    ],
    name: "getMedicineMRP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "manufacturerExists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "medicineExists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "medicineList",
    outputs: [
      {
        internalType: "uint256",
        name: "serialNo",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "medicineID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "manufacturerID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "manufacturingDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiryDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "MRP",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "medicineUsed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "serialNoExists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "serialNoToMedicineID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_medicineDispensed",
        type: "uint256[]",
      },
    ],
    name: "updateMedicineStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_serailNo",
        type: "uint256",
      },
    ],
    name: "validSerialNo",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
