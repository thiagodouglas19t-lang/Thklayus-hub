export type UserRole = "cliente" | "dev" | "admin";

const defaultOwnerEmails = ["thiagodouglas19t@gmail.com"];
const defaultStaffEmails = ["dth091442@gmail.com"];

function parseEmails(value?: string) {
  return (value ?? "")
    .split(",")
    .map((email: string) => email.trim().toLowerCase())
    .filter(Boolean);
}

const ownerEmails = [
  ...defaultOwnerEmails,
  ...parseEmails(import.meta.env.VITE_OWNER_EMAILS),
];

const staffEmails = [
  ...defaultStaffEmails,
  ...parseEmails(import.meta.env.VITE_STAFF_EMAILS),
];

export function getUserRole(email?: string | null): UserRole {
  const userEmail = email?.toLowerCase() ?? "";

  if (ownerEmails.includes(userEmail)) return "dev";
  if (staffEmails.includes(userEmail)) return "admin";

  return "cliente";
}

export function canAccessInternalPanel(email?: string | null) {
  const role = getUserRole(email);
  return role === "admin" || role === "dev";
}
