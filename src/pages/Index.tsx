import { useState } from "react";
import { TopBar } from "@/components/dashboard/TopBar";
import { LeftPanel } from "@/components/dashboard/LeftPanel";
import { MapView } from "@/components/dashboard/MapView";
import { StationGrid } from "@/components/dashboard/StationGrid";
import { RightPanel } from "@/components/dashboard/RightPanel";

const Index = () => {
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [threshold, setThreshold] = useState(200);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <TopBar />
      <div className="flex flex-1 min-h-0">
        <LeftPanel
          selectedStationId={selectedStationId}
          onSelectStation={setSelectedStationId}
          threshold={threshold}
          onThresholdChange={setThreshold}
        />
        <main className="flex-1 flex flex-col min-w-0 p-3 gap-3 overflow-y-auto">
          <MapView
            selectedStationId={selectedStationId}
            onSelectStation={setSelectedStationId}
            threshold={threshold}
          />
          <StationGrid
            selectedStationId={selectedStationId}
            onSelectStation={setSelectedStationId}
            threshold={threshold}
          />
        </main>
        <RightPanel
          selectedStationId={selectedStationId}
          threshold={threshold}
        />
      </div>
    </div>
  );
};

export default Index;
