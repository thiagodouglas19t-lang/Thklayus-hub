export type UserRole = "cliente" | "dev" | "admin";

const ownerEmails = (import.meta.env.VITE_OWNER_EMAILS ?? "")
  .split(",")
  .map((email: string) => email.trim().toLowerCase())
  .filter(Boolean);

const staffEmails = (import.meta.env.VITE_STAFF_EMAILS ?? "")
  .split(",")
  .map((email: string) => email.trim().toLowerCase())
  .filter(Boolean);

export function getUserRole(email?: string | null): UserRole {
  const userEmail = email?.toLowerCase() ?? "";

  if (ownerEmails.includes(userEmail)) return "admin";
  if (staffEmails.includes(userEmail)) return "dev";

  return "cliente";
}

export function canAccessInternalPanel(email?: string | null) {
  const role = getUserRole(email);
  return role === "admin" || role === "dev";
}
