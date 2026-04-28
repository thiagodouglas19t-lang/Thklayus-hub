const BRASILIA_TIME_ZONE = "America/Sao_Paulo";

export function formatBrasiliaDateTime(value?: string | Date | null) {
  if (!value) return "Sem data";

  try {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) return "Sem data";

    return new Intl.DateTimeFormat("pt-BR", {
      timeZone: BRASILIA_TIME_ZONE,
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "Sem data";
  }
}

export function formatBrasiliaDate(value?: string | Date | null) {
  if (!value) return "Sem data";

  try {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) return "Sem data";

    return new Intl.DateTimeFormat("pt-BR", {
      timeZone: BRASILIA_TIME_ZONE,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  } catch {
    return "Sem data";
  }
}

export function getBrasiliaNowLabel() {
  return formatBrasiliaDateTime(new Date());
}
