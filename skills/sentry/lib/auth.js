import { readFileSync, existsSync } from "fs";
import { homedir } from "os";
import { join } from "path";

export const SENTRY_API_BASE = "https://sentry.io/api/0";

/**
 * Get auth token from ~/.sentryclirc
 * @returns {string} The auth token
 */
export function getAuthToken() {
  const rcPath = join(homedir(), ".sentryclirc");
  if (!existsSync(rcPath)) {
    console.error("Error: ~/.sentryclirc not found");
    console.error("Run 'sentry-cli login' to authenticate");
    process.exit(1);
  }

  const content = readFileSync(rcPath, "utf-8");
  const match = content.match(/token\s*=\s*(.+)/);
  if (!match) {
    console.error("Error: No token found in ~/.sentryclirc");
    process.exit(1);
  }
  return match[1].trim();
}

/**
 * Fetch JSON from a Sentry API endpoint
 * @param {string} url - The full URL to fetch
 * @param {string} token - The auth token
 * @returns {Promise<any>} The parsed JSON response
 */
export async function fetchJson(url, token) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  return res.json();
}

/**
 * Format a timestamp for display
 * @param {string|number} ts - Timestamp (ISO string or unix)
 * @returns {string} Formatted timestamp
 */
export function formatTimestamp(ts) {
  if (!ts) return "N/A";
  try {
    const date = new Date(ts);
    if (isNaN(date.getTime())) return ts;
    return date.toLocaleString();
  } catch {
    return ts;
  }
}
