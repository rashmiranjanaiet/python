export interface EnvironmentalData {
  temperature: number;
  humidity: number;
  rainfall: number;
  location: string;
}

export enum RiskLevel {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical"
}

export interface RiskAnalysis {
  riskLevel: RiskLevel;
  probability: string;
  primaryThreat: string;
  analysis: string;
  actionPlan: string[];
  citation: string;
}

export interface LocationOption {
  state: string;
  districts: string[];
}

export const NE_LOCATIONS: LocationOption[] = [
  { state: "Assam", districts: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur"] },
  { state: "Meghalaya", districts: ["Shillong", "Tura", "Jowai", "Nongpoh"] },
  { state: "Manipur", districts: ["Imphal", "Churachandpur", "Thoubal"] },
  { state: "Mizoram", districts: ["Aizawl", "Lunglei", "Champhai"] },
  { state: "Nagaland", districts: ["Kohima", "Dimapur", "Mokokchung"] },
  { state: "Tripura", districts: ["Agartala", "Udaipur", "Dharmanagar"] },
  { state: "Arunachal Pradesh", districts: ["Itanagar", "Tawang", "Pasighat"] },
  { state: "Sikkim", districts: ["Gangtok", "Namchi", "Geyzing"] }
];
