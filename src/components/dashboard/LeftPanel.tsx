import { stations } from "@/data/stations";
import { ChevronDown, Gauge, Shield, AlertTriangle } from "lucide-react";

interface LeftPanelProps {
  selectedStationId: string | null;
  onSelectStation: (id: string) => void;
  threshold: number;
  onThresholdChange: (value: number) => void;
}

export function LeftPanel({
  selectedStationId,
  onSelectStation,
  threshold,
  onThresholdChange,
}: LeftPanelProps) {
  const avgAqi = Math.round(
    stations.reduce((sum, s) => sum + s.aqi, 0) / stations.length
  );
  const activeUnits = stations.filter((s) => s.mitigationActive).length;
  const aboveThreshold = stations.filter((s) => s.aqi > threshold).length;

  return (
    <aside className="w-56 border-r border-panel-border bg-card flex flex-col shrink-0 overflow-y-auto">
      <div className="p-3 border-b border-panel-border">
        <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
          Select Ward
        </label>
        <div className="relative">
          <select
            value={selectedStationId || ""}
            onChange={(e) => onSelectStation(e.target.value)}
            className="w-full appearance-none bg-muted border border-border rounded px-2.5 py-1.5 text-xs font-medium text-foreground pr-7 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Wards</option>
            {stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — AQI {s.aqi}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <div className="p-3 border-b border-panel-border">
        <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
          AQI Threshold
        </label>
        <input
          type="range"
          min={100}
          max={400}
          step={10}
          value={threshold}
          onChange={(e) => onThresholdChange(Number(e.target.value))}
          className="w-full accent-primary h-1"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
          <span>100</span>
          <span className="font-semibold text-foreground">{threshold}</span>
          <span>400</span>
        </div>
      </div>

      <div className="p-3 flex-1">
        <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-3">
          System Summary
        </h3>
        <div className="space-y-3">
          <SummaryItem
            icon={Gauge}
            label="Avg AQI (12 wards)"
            value={String(avgAqi)}
            valueColor={avgAqi > 200 ? "text-aqi-very-poor" : avgAqi > 100 ? "text-aqi-poor" : "text-aqi-moderate"}
          />
          <SummaryItem
            icon={Shield}
            label="Active Mitigation"
            value={String(activeUnits)}
            valueColor={activeUnits > 0 ? "text-aqi-severe" : "text-status-active"}
          />
          <SummaryItem
            icon={AlertTriangle}
            label="Wards Above Threshold"
            value={`${aboveThreshold} / 12`}
            valueColor={aboveThreshold > 3 ? "text-aqi-very-poor" : "text-muted-foreground"}
          />
        </div>
      </div>

      <div className="p-3 border-t border-panel-border">
        <div className="text-[10px] text-muted-foreground space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-aqi-good" /> Good (0–50)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-aqi-moderate" /> Moderate (51–100)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-aqi-poor" /> Poor (101–200)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-aqi-very-poor" /> Very Poor (201–300)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-aqi-severe" /> Severe (301+)
          </div>
        </div>
      </div>
    </aside>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value,
  valueColor,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  valueColor: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="p-1.5 rounded bg-muted">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
        <p className={`text-base font-semibold font-mono ${valueColor}`}>{value}</p>
      </div>
    </div>
  );
}
