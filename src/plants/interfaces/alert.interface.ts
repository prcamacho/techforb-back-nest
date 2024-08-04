export interface PlantAlert {
  name: string;
  country: string;
  totalAlerts: number;
  severityCounts: Record<string, number>;
}
