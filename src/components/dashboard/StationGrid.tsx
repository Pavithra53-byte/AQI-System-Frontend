import { stations, getCategoryBadgeClass, type Station } from "@/data/stations";
import { ArrowUp, ArrowDown, ArrowRight, Shield } from "lucide-react";

interface StationGridProps {
  selectedStationId: string | null;
  onSelectStation: (id: string) => void;
  threshold: number;
}

export function StationGrid({ selectedStationId, onSelectStation, threshold }: StationGridProps) {
  return (
    <div className="panel p-3">
      <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
        Ward Overview
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        {stations.map((station) => {
          const isSelected = selectedStationId === station.id;
          const aboveThreshold = station.predictedAqi > threshold;

          return (
            <button
              key={station.id}
              onClick={() => onSelectStation(station.id)}
              className={`text-left p-2 rounded border transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-panel-border bg-card hover:border-primary/30"
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <p className="text-[11px] font-medium text-foreground leading-tight truncate pr-1">
                  {station.name}
                </p>
                <TrendArrow trend={station.trend} />
              </div>

              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-lg font-bold font-mono text-foreground">
                  {station.aqi}
                </span>
                <span className={`text-[10px] font-medium px-1 py-0.5 rounded ${getCategoryBadgeClass(station.category)}`}>
                  {station.category}
                </span>
              </div>

              <p className="text-[10px] text-muted-foreground">
                Pred: <span className="font-mono font-medium">{station.predictedAqi}</span>
                <span className="text-muted-foreground/60"> (6h)</span>
              </p>

              {aboveThreshold && station.mitigationActive && (
                <div className="flex items-center gap-1 mt-1.5 text-[10px] text-aqi-severe font-medium">
                  <Shield className="h-2.5 w-2.5" />
                  Mitigation Active
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TrendArrow({ trend }: { trend: Station["trend"] }) {
  if (trend === "up") return <ArrowUp className="h-3 w-3 text-aqi-poor shrink-0" />;
  if (trend === "down") return <ArrowDown className="h-3 w-3 text-aqi-good shrink-0" />;
  return <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />;
}
