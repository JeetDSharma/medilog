import { ethers } from "ethers"

/**
 * @param {string} value
 * @param {string} fieldLabel
 * @returns {string|null} Error message or null if valid
 */
export function validateRequired(value, fieldLabel) {
  if (value === undefined || value === null || String(value).trim() === "") {
    return `${fieldLabel} is required.`
  }
  return null
}

/**
 * @param {string} value
 * @returns {string|null}
 */
export function validateEthAddress(value) {
  const err = validateRequired(value, "Wallet address")
  if (err) return err
  const trimmed = String(value).trim()
  if (!ethers.utils.isAddress(trimmed)) {
    return "Enter a valid Ethereum address (0x…)."
  }
  return null
}

/**
 * @param {string} value
 * @param {string} fieldLabel
 * @returns {string|null}
 */
export function validateOptionalEthAddress(value, fieldLabel) {
  if (value === undefined || value === null || String(value).trim() === "") {
    return null
  }
  const trimmed = String(value).trim()
  if (!ethers.utils.isAddress(trimmed)) {
    return `${fieldLabel} must be a valid Ethereum address (0x…).`
  }
  return null
}
