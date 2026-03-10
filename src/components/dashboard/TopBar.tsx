import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

export function TopBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-10 bg-topbar flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-2.5">
        <span className="text-topbar-foreground font-semibold text-xs tracking-wide">
          VayuRaksha
        </span>
        <span className="text-topbar-foreground/50 text-[10px] hidden sm:inline">
          Hyper-Local AQI Intelligence & Mitigation System
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-topbar-foreground/70 text-[10px] font-mono">
          {time.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}{" "}
          {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
        </span>
        <div className="flex items-center gap-1">
          <Activity className="h-2.5 w-2.5 text-status-active animate-pulse-slow" />
          <span className="text-status-active text-[10px] font-medium">Monitoring Active</span>
        </div>
      </div>
    </header>
  );
}
