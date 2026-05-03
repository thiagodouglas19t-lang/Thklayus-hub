import { RiskPoint } from "./types";

export const mockRisks: RiskPoint[] = [
  {
    id: 1,
    title: "Área com assaltos",
    type: "crime",
    level: "high",
    position: [-3.7605, -38.5434],
    description: "Relatos recentes de assalto",
  },
  {
    id: 2,
    title: "Rua escura",
    type: "iluminação",
    level: "medium",
    position: [-3.7615, -38.545],
    description: "Pouca iluminação à noite",
  },
];
