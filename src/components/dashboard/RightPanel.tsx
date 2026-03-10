import { stations, getCategoryBadgeClass, getCategoryColor } from "@/data/stations";
import { Droplets, Brain, Shield, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface RightPanelProps {
  selectedStationId: string | null;
  threshold: number;
}

export function RightPanel({ selectedStationId, threshold }: RightPanelProps) {
  const station = stations.find((s) => s.id === selectedStationId);

  if (!station) {
    return (
      <aside className="w-64 border-l border-panel-border bg-card flex flex-col shrink-0">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center text-muted-foreground">
            <Info className="h-6 w-6 mx-auto mb-2 opacity-40" />
            <p className="text-xs font-medium">Select a ward</p>
            <p className="text-[10px] mt-0.5">Click a marker or card to view details</p>
          </div>
        </div>
      </aside>
    );
  }

  const aboveThreshold = station.aqi > threshold;
  const nearThreshold = !aboveThreshold && station.predictedAqi > threshold * 0.85;
  const colorClass = getCategoryColor(station.category);

  return (
    <aside className="w-64 border-l border-panel-border bg-card flex flex-col shrink-0 overflow-y-auto">
      {/* Station header */}
      <div className="p-3 border-b border-panel-border">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Selected Ward</p>
        <h2 className="text-sm font-semibold text-foreground">{station.name}</h2>
      </div>

      {/* AQI display */}
      <div className="p-3 border-b border-panel-border">
        <div className="flex items-center gap-3">
          <div className={`w-14 h-14 rounded-lg flex items-center justify-center bg-${colorClass}/10 border border-${colorClass}/20`}>
            <span className={`text-2xl font-bold font-mono text-${colorClass}`}>
              {station.aqi}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${getCategoryBadgeClass(station.category)}`}>
              {station.category}
            </span>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Droplets className="h-3 w-3" />
              PM2.5: <span className="font-mono font-semibold text-foreground">{station.pm25}</span> µg/m³
            </div>
          </div>
        </div>
      </div>

      {/* 24h prediction chart */}
      <div className="p-3 border-b border-panel-border">
        <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
          AQI Trend & Prediction
        </h3>
        <MiniChart
          pastData={station.hourlyData}
          futureData={station.predictedHourlyData}
          threshold={threshold}
        />
        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-foreground/60 inline-block" /> Observed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-primary/50 inline-block border-t border-dashed border-primary" /> Predicted
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-aqi-very-poor inline-block" /> Threshold
          </span>
        </div>
      </div>

      {/* AI Insights */}
      <div className="p-3 flex-1">
        <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
          <Brain className="h-3 w-3" />
          AI Insight
        </h3>

        {!aboveThreshold && !nearThreshold && (
          <div className="p-2.5 rounded bg-aqi-good/8 border border-aqi-good/20">
            <div className="flex items-start gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-aqi-good shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground font-medium">Normal Conditions</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Air quality within acceptable range. Monitoring continues.
                </p>
              </div>
            </div>
          </div>
        )}

        {nearThreshold && !aboveThreshold && (
          <div className="p-2.5 rounded bg-aqi-moderate/8 border border-aqi-moderate/20">
            <div className="flex items-start gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-aqi-moderate shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground font-medium">Caution — Rising Trend</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Rising trend detected. Possible traffic congestion impact.
                </p>
              </div>
            </div>
          </div>
        )}

        {aboveThreshold && (
          <div className="space-y-2">
            <div className="p-2.5 rounded bg-aqi-severe/8 border border-aqi-severe/20">
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-aqi-severe shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-foreground font-medium">Threshold Exceeded</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    AQI crossed threshold of {threshold}.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-[11px]">
              <DetailRow label="Source" value={station.source || "Regional Pollution"} />
              <DetailRow
                label="Risk"
                value={station.aqi > 300 ? "High" : "Elevated"}
                valueClass={station.aqi > 300 ? "text-aqi-severe font-semibold" : "text-aqi-poor font-semibold"}
              />
              <DetailRow
                label="Action"
                value={
                  station.aqi > 300
                    ? "Deploy sprinklers, restrict vehicles"
                    : "Increase monitoring frequency"
                }
              />
              <DetailRow
                label="Mitigation"
                value={station.mitigationActive ? "Activated" : "Standby"}
                valueClass={station.mitigationActive ? "text-aqi-severe font-semibold" : "text-status-standby font-semibold"}
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function DetailRow({
  label,
  value,
  valueClass = "text-foreground",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between py-1 border-b border-panel-border last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={`text-right max-w-[55%] ${valueClass}`}>{value}</span>
    </div>
  );
}

function MiniChart({
  pastData,
  futureData,
  threshold,
}: {
  pastData: number[];
  futureData: number[];
  threshold: number;
}) {
  const allData = [...pastData, ...futureData];
  const maxVal = Math.max(...allData, threshold) * 1.1;
  const minVal = Math.min(...allData, threshold) * 0.8;
  const range = maxVal - minVal;

  const w = 220;
  const h = 80;
  const padding = 4;
  const totalPoints = allData.length;

  const getX = (i: number) => padding + (i / (totalPoints - 1)) * (w - padding * 2);
  const getY = (val: number) => padding + ((maxVal - val) / range) * (h - padding * 2);

  const pastPath = pastData
    .map((val, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(val)}`)
    .join(" ");

  const futurePath = futureData
    .map((val, i) => {
      const idx = pastData.length - 1 + i;
      return `${i === 0 ? "M" : "L"} ${getX(idx)} ${getY(val)}`;
    })
    .join(" ");

  const connectPath = `M ${getX(pastData.length - 1)} ${getY(pastData[pastData.length - 1])} L ${getX(pastData.length)} ${getY(futureData[0])}`;
  const thresholdY = getY(threshold);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <line x1={padding} y1={thresholdY} x2={w - padding} y2={thresholdY} stroke="hsl(0 72% 51%)" strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
      <text x={w - padding} y={thresholdY - 3} textAnchor="end" fill="hsl(0 72% 51%)" fontSize="6" opacity={0.7}>
        {threshold}
      </text>
      <line x1={getX(pastData.length - 1)} y1={padding} x2={getX(pastData.length - 1)} y2={h - padding} stroke="hsl(220 15% 88%)" strokeWidth={1} strokeDasharray="3 3" />
      <text x={getX(pastData.length - 1)} y={h - 1} textAnchor="middle" fill="hsl(220 10% 60%)" fontSize="5">Now</text>
      <path d={pastPath} fill="none" stroke="hsl(220 25% 30%)" strokeWidth={1.5} />
      <path d={connectPath} fill="none" stroke="hsl(215 50% 50%)" strokeWidth={1.5} strokeDasharray="3 2" />
      <path d={futurePath} fill="none" stroke="hsl(215 50% 50%)" strokeWidth={1.5} strokeDasharray="3 2" />
      {pastData.map((val, i) => (
        <circle key={`p-${i}`} cx={getX(i)} cy={getY(val)} r={1.5} fill="hsl(220 25% 30%)" />
      ))}
      {futureData.map((val, i) => (
        <circle key={`f-${i}`} cx={getX(pastData.length + i)} cy={getY(val)} r={1.5} fill="hsl(215 50% 50%)" stroke="white" strokeWidth={0.5} />
      ))}
    </svg>
  );
}
