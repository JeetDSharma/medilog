/**
 * Base URL for the MediLog Express API. Override with NEXT_PUBLIC_MEDILOG_API in production.
 */
export const API_BASE =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_MEDILOG_API
    ? process.env.NEXT_PUBLIC_MEDILOG_API.replace(/\/$/, "")
    : "http://localhost:5001"
