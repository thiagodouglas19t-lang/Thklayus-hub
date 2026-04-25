import { Ticket } from "../types";

const KEY = "thklayus_tickets";

export function getTickets(): Ticket[] {
  const data = localStorage.getItem(KEY);

  try {
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTickets(tickets: Ticket[]) {
  localStorage.setItem(KEY, JSON.stringify(tickets));
}

export function addTicket(ticket: Ticket) {
  const tickets = getTickets();
  saveTickets([ticket, ...tickets]);
}
