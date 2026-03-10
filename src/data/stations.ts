export type AQICategory = "Good" | "Moderate" | "Poor" | "Very Poor" | "Severe";
export type TrendDirection = "up" | "down" | "stable";

export interface Station {
  id: string;
  name: string;
  aqi: number;
  predictedAqi: number;
  pm25: number;
  category: AQICategory;
  trend: TrendDirection;
  lat: number;
  lng: number;
  mitigationActive: boolean;
  hourlyData: number[];
  predictedHourlyData: number[];
  source?: string;
}

export function getCategory(aqi: number): AQICategory {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 200) return "Poor";
  if (aqi <= 300) return "Very Poor";
  return "Severe";
}

export function getCategoryColor(category: AQICategory): string {
  switch (category) {
    case "Good": return "aqi-good";
    case "Moderate": return "aqi-moderate";
    case "Poor": return "aqi-poor";
    case "Very Poor": return "aqi-very-poor";
    case "Severe": return "aqi-severe";
  }
}

export function getCategoryBadgeClass(category: AQICategory): string {
  switch (category) {
    case "Good": return "aqi-badge-good";
    case "Moderate": return "aqi-badge-moderate";
    case "Poor": return "aqi-badge-poor";
    case "Very Poor": return "aqi-badge-very-poor";
    case "Severe": return "aqi-badge-severe";
  }
}

// Realistic Delhi-NCR stations with natural variation
// Only 2 severe, most moderate/poor
export const stations: Station[] = [
  {
    id: "aiims", name: "AIIMS Delhi", aqi: 142, predictedAqi: 155, pm25: 68,
    category: "Poor", trend: "up", lat: 28.5672, lng: 77.2100,
    mitigationActive: false,
    hourlyData: [120, 125, 130, 128, 135, 138, 140, 142],
    predictedHourlyData: [145, 148, 152, 155, 153, 150],
  },
  {
    id: "anand-vihar", name: "Anand Vihar", aqi: 342, predictedAqi: 360, pm25: 195,
    category: "Severe", trend: "up", lat: 28.6469, lng: 77.3164,
    mitigationActive: true,
    hourlyData: [280, 295, 310, 318, 325, 330, 338, 342],
    predictedHourlyData: [348, 352, 358, 360, 355, 350],
    source: "Traffic Congestion + Industrial",
  },
  {
    id: "chandni-chowk", name: "Chandni Chowk", aqi: 178, predictedAqi: 165, pm25: 88,
    category: "Poor", trend: "down", lat: 28.6506, lng: 77.2334,
    mitigationActive: false,
    hourlyData: [195, 192, 188, 185, 183, 180, 179, 178],
    predictedHourlyData: [175, 172, 170, 168, 166, 165],
  },
  {
    id: "connaught-place", name: "Connaught Place", aqi: 95, predictedAqi: 102, pm25: 42,
    category: "Moderate", trend: "stable", lat: 28.6315, lng: 77.2167,
    mitigationActive: false,
    hourlyData: [88, 90, 92, 93, 94, 94, 95, 95],
    predictedHourlyData: [96, 97, 98, 100, 101, 102],
  },
  {
    id: "dwarka", name: "Dwarka", aqi: 118, predictedAqi: 112, pm25: 55,
    category: "Poor", trend: "down", lat: 28.5921, lng: 77.0460,
    mitigationActive: false,
    hourlyData: [135, 132, 128, 125, 122, 120, 119, 118],
    predictedHourlyData: [116, 115, 114, 113, 112, 112],
  },
  {
    id: "faridabad", name: "Faridabad", aqi: 165, predictedAqi: 172, pm25: 82,
    category: "Poor", trend: "up", lat: 28.4089, lng: 77.3178,
    mitigationActive: false,
    hourlyData: [145, 148, 152, 155, 158, 160, 163, 165],
    predictedHourlyData: [167, 168, 170, 171, 172, 172],
  },
  {
    id: "ghaziabad", name: "Ghaziabad", aqi: 310, predictedAqi: 325, pm25: 178,
    category: "Severe", trend: "up", lat: 28.6692, lng: 77.4538,
    mitigationActive: true,
    hourlyData: [268, 275, 282, 290, 295, 300, 305, 310],
    predictedHourlyData: [315, 318, 320, 322, 324, 325],
    source: "Construction + Regional Transport",
  },
  {
    id: "greater-noida", name: "Greater Noida", aqi: 88, predictedAqi: 92, pm25: 38,
    category: "Moderate", trend: "stable", lat: 28.4744, lng: 77.5040,
    mitigationActive: false,
    hourlyData: [82, 84, 85, 86, 87, 87, 88, 88],
    predictedHourlyData: [89, 89, 90, 91, 91, 92],
  },
  {
    id: "gurugram", name: "Gurugram", aqi: 132, predictedAqi: 128, pm25: 62,
    category: "Poor", trend: "down", lat: 28.4595, lng: 77.0266,
    mitigationActive: false,
    hourlyData: [148, 145, 142, 140, 138, 135, 134, 132],
    predictedHourlyData: [131, 130, 129, 129, 128, 128],
  },
  {
    id: "lodhi-road", name: "Lodhi Road", aqi: 72, predictedAqi: 78, pm25: 32,
    category: "Moderate", trend: "stable", lat: 28.5918, lng: 77.2273,
    mitigationActive: false,
    hourlyData: [65, 67, 68, 69, 70, 71, 71, 72],
    predictedHourlyData: [73, 74, 75, 76, 77, 78],
  },
  {
    id: "noida-62", name: "Noida Sector 62", aqi: 105, predictedAqi: 110, pm25: 48,
    category: "Poor", trend: "up", lat: 28.6270, lng: 77.3650,
    mitigationActive: false,
    hourlyData: [92, 94, 96, 98, 100, 102, 104, 105],
    predictedHourlyData: [106, 107, 108, 109, 110, 110],
  },
  {
    id: "vasant-kunj", name: "Vasant Kunj", aqi: 58, predictedAqi: 55, pm25: 25,
    category: "Moderate", trend: "down", lat: 28.5200, lng: 77.1600,
    mitigationActive: false,
    hourlyData: [68, 66, 64, 62, 61, 60, 59, 58],
    predictedHourlyData: [57, 56, 56, 55, 55, 55],
  },
];
