import { stations, getCategoryColor } from "@/data/stations";

interface MapViewProps {
  selectedStationId: string | null;
  onSelectStation: (id: string) => void;
  threshold: number;
}

export function MapView({ selectedStationId, onSelectStation }: MapViewProps) {
  const minLat = 28.38, maxLat = 28.70;
  const minLng = 77.0, maxLng = 77.55;

  const toX = (lng: number) => 20 + ((lng - minLng) / (maxLng - minLng)) * 560;
  const toY = (lat: number) => 20 + ((maxLat - lat) / (maxLat - minLat)) * 280;

  return (
    <div className="panel p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          Delhi-NCR Ward Monitoring Network
        </h3>
        <span className="text-[10px] text-muted-foreground">12 Active Wards</span>
      </div>
      <div className="relative bg-muted/50 rounded border border-panel-border overflow-hidden">
        <svg viewBox="0 0 600 320" className="w-full h-auto">
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`vg-${i}`} x1={20 + i * 93.3} y1={20} x2={20 + i * 93.3} y2={300} stroke="hsl(220 15% 88%)" strokeWidth={0.5} />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`hg-${i}`} x1={20} y1={20 + i * 70} x2={580} y2={20 + i * 70} stroke="hsl(220 15% 88%)" strokeWidth={0.5} />
          ))}
          <ellipse cx="300" cy="160" rx="250" ry="130" fill="none" stroke="hsl(215 25% 80%)" strokeWidth={1} strokeDasharray="6 3" />
          <text x="120" y="45" fill="hsl(220 10% 70%)" fontSize="9" fontFamily="Inter">Delhi</text>
          <text x="450" y="45" fill="hsl(220 10% 70%)" fontSize="9" fontFamily="Inter">NCR East</text>
          <text x="60" y="270" fill="hsl(220 10% 70%)" fontSize="9" fontFamily="Inter">NCR West</text>

          {stations.map((station) => {
            const cx = toX(station.lng);
            const cy = toY(station.lat);
            const isSelected = selectedStationId === station.id;
            const colorName = getCategoryColor(station.category);
            const colorMap: Record<string, string> = {
              "aqi-good": "hsl(142 60% 40%)",
              "aqi-moderate": "hsl(45 85% 50%)",
              "aqi-poor": "hsl(25 90% 52%)",
              "aqi-very-poor": "hsl(0 72% 51%)",
              "aqi-severe": "hsl(0 80% 38%)",
            };
            const color = colorMap[colorName] || "hsl(220 10% 46%)";

            return (
              <g key={station.id} onClick={() => onSelectStation(station.id)} className="cursor-pointer">
                {station.category === "Severe" && (
                  <circle cx={cx} cy={cy} r={16} fill={color} opacity={0.15}>
                    <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                {isSelected && (
                  <circle cx={cx} cy={cy} r={14} fill="none" stroke="hsl(215 50% 23%)" strokeWidth={2} />
                )}
                <circle cx={cx} cy={cy} r={isSelected ? 9 : 7} fill={color} stroke="white" strokeWidth={1.5} opacity={0.9} />
                <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="6" fontWeight="600" fontFamily="JetBrains Mono">
                  {station.aqi}
                </text>
                <text x={cx} y={cy + 17} textAnchor="middle" fill="hsl(220 25% 30%)" fontSize="7" fontWeight="500" fontFamily="Inter">
                  {station.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
