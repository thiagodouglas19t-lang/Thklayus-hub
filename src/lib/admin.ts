export const ADMIN_EMAIL = "thiagodouglas19t@gmail.com";

export function isAdminEmail(email?: string | null) {
  return String(email || "").trim().toLowerCase() === ADMIN_EMAIL;
}

export function adminCoins(currentCoins: number, email?: string | null) {
  return isAdminEmail(email) ? 999999 : currentCoins;
}
