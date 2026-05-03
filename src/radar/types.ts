export type LatLng = [number, number];

export type RiskLevel = "low" | "medium" | "high";

export type RiskPoint = {
  id: number;
  title: string;
  type: string;
  level: RiskLevel;
  position: LatLng;
  description: string;
};
