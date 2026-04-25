export type UserRole = "user" | "admin";

export type TicketStatus = "aberto" | "respondido" | "fechado";

export interface Ticket {
  id: string;
  title: string;
  message: string;
  status: TicketStatus;
  createdAt: string;
  userName: string;
  adminReply?: string;
}
