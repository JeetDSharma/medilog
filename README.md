# MediLog

MediLog is a **medicine supply chain** web application that combines a **Next.js** front end, a **Node.js / Express** API with **MongoDB**, and **Ethereum smart contracts** (Hardhat) so manufacturers, doctors, pharmacies, and patients can trace medicines from production through prescription and dispensing.

---

## What it does

- **Manufacturers** register drugs, manage inventory, and record production on-chain.
- **Doctors** issue prescriptions tied to the on-chain workflow.
- **Pharmacies** verify patients, dispense medicine, and handle sales.
- **Patients** view prescriptions, check medicine authenticity, and use QR-based flows.
- **Administrators** manage entities (doctors, pharmacies, manufacturers, patients, medicines) via dedicated admin pages.

Off-chain profile and listing data live in **MongoDB**; critical supply-chain steps are mirrored or enforced in **Solidity** contracts (`Medicine`, `PrescribeMedicine`, `DispenseMedicine`, `ManufacturerSale`).

---

## Tech stack

| Layer | Technologies |
|--------|----------------|
| UI | Next.js 13, React 18, Bootstrap 5, Sass/CSS modules, ApexCharts / Recharts |
| API | Express, Mongoose, body-parser, CORS headers |
| Data | MongoDB |
| Blockchain | Hardhat, Solidity 0.8.8, ethers v5, Web3.js |
| Tooling | Mocha (tests), concurrent dev scripts |

---

## Repository layout

```
MediLog/
├── pages/              # Next.js routes (manufacturer, doctor, pharmacy, patient, admin)
├── components/         # Shared UI (e.g. Header, Footer)
├── backend/            # Express app (controllers, models, routes)
├── HardHat/            # Contracts, deploy scripts, unit tests
├── ethereum/           # Web3 helpers used by the app
├── public/static/      # Assets and CSS modules
└── package.json        # Root scripts and frontend dependencies
```

---

## Prerequisites

- **Node.js** (LTS recommended)
- **MongoDB** (local or Atlas) and a connection string
- **npm** (or yarn where you already use it, e.g. under `HardHat/`)
- For on-chain features: a wallet (e.g. MetaMask) and, for public networks, RPC credentials and deployed contract addresses

---

## Setup

### 1. Install dependencies

From the repository root:

```bash
npm install
cd backend && npm install && cd ..
```

For smart contract development and tests:

```bash
cd HardHat && npm install && cd ..
```

### 2. Configure the backend

Create `backend/.env` (values are examples only):

```env
MONGOCONNECTIONURL=mongodb://localhost:27017/medilog
SERVERPORT=5000
```

The API listens on `SERVERPORT` and connects with `MONGOCONNECTIONURL`.

### 3. Configure the frontend / blockchain addresses

Contract addresses used by the app are exported from `pages/constants.js`. After you deploy contracts (local Hardhat node or a testnet), update the `medicineAdd`, `prescribeAdd`, `dispenseAdd`, and `saleAdd` values to match your deployment.

The shared Web3 helper in `ethereum/web3.js` uses a browser provider when available; otherwise it falls back to an HTTP provider. For production or shared deployments, point this at your own RPC endpoint and avoid committing secrets.

### 4. (Optional) Hardhat environment

For testnet deployment or gas reporting, you can set variables supported in `HardHat/hardhat.config.js` (for example `PRIVATE_KEY`, `POLYGON_MUMBAI_RPC_URL`, explorer keys). Networks other than `hardhat` are commented out by default—uncomment and configure as needed.

---

## Run the application

**API + Next.js together** (from the repo root):

```bash
npm run dev
```

This runs `next dev` and `nodemon` on the backend concurrently.

**Run separately:**

```bash
# Terminal 1 — frontend (default http://localhost:3000)
npm run start:frontend

# Terminal 2 — backend
npm run start:backend
```

**Production build:**

```bash
npm run build
npm start
```

Ensure MongoDB is reachable before starting the backend.

---

## Smart contracts (Hardhat)

From `HardHat/`:

```bash
npx hardhat test
```

Local chain and deploy (typical flow):

```bash
npx hardhat node
# in another terminal, from HardHat/
npx hardhat deploy
```

Deploy scripts run in order: `01-deploy-medicine`, `02-deploy-prescribe`, `03-deploy-dispense`, `04-deploy-sale`. Copy the deployed addresses into `pages/constants.js`.

---

## REST API

Base URL (default): `http://localhost:5000`

All routes below are prefixed with the shown path. `GET` routes take no body; `POST` routes expect JSON where applicable.

### Medicine

| Method | Path |
|--------|------|
| GET | `/api/medicinelist` |
| POST | `/api/medicineAdd` |
| POST | `/api/medicineDelete` |
| POST | `/api/medicineUpdate` |
| POST | `/api/medicineGetDetails` |

### Doctor

| Method | Path |
|--------|------|
| GET | `/api/doctorlist` |
| POST | `/api/doctorAdd` |
| POST | `/api/doctorDelete` |
| POST | `/api/doctorUpdate` |
| POST | `/api/doctorGetDetails` |
| POST | `/api/doctorGetDetailByWallet` |

### Pharmacy

| Method | Path |
|--------|------|
| GET | `/api/pharmacylist` |
| POST | `/api/pharmacyAdd` |
| POST | `/api/pharmacyDelete` |
| POST | `/api/pharmacyUpdate` |
| POST | `/api/pharmacyGetDetails` |
| POST | `/api/pharmacyGetDetailByWallet` |

### Manufacturer

| Method | Path |
|--------|------|
| GET | `/api/manufacturerlist` |
| POST | `/api/manufacturerAdd` |
| POST | `/api/manufacturerDelete` |
| POST | `/api/manufacturerUpdate` |
| POST | `/api/manufacturerGetDetails` |
| POST | `/api/manufacturerGetDetailByWallet` |

### Patient

| Method | Path |
|--------|------|
| GET | `/api/patientlist` |
| POST | `/api/patientAdd` |
| POST | `/api/patientDelete` |
| POST | `/api/patientUpdate` |
| POST | `/api/patientGetDetails` |
| POST | `/api/patientGetDetailByWallet` |

The API allows cross-origin requests from any origin (`*`) for development; tighten CORS before exposing this to the public internet.

---

## Scripts (root `package.json`)

| Script | Purpose |
|--------|---------|
| `npm run dev` | Next.js dev server + backend |
| `npm run start:frontend` | Next.js only |
| `npm run start:backend` | Express API only |
| `npm run build` | Production build |
| `npm start` | Serve production Next.js |
| `npm run lint` | Next.js lint |

---

## License

This project is licensed under the **GNU General Public License v3.0**—see the [`LICENSE`](./LICENSE) file.

---

## Links

- **Repository:** [github.com/quonss/MediLog](https://github.com/quonss/MediLog)
- **Issues:** [github.com/quonss/MediLog/issues](https://github.com/quonss/MediLog/issues)
