import { useState } from "react";
import { BrainCircuit, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { sidebarItems } from "./SidebarData";
import { clsx } from "clsx";
import { syncKnowledge } from "../../services/api";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [sourcesCount, setSourcesCount] = useState(184);
  const [lastSyncTime, setLastSyncTime] = useState("4 minutes ago");

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await syncKnowledge();
      if (res.synced_files && res.synced_files.length > 0) {
        setSourcesCount((prev) => prev + res.synced_files.length);
      }
      setLastSyncTime("Just now");
    } catch (e) {
      console.error(e);
      alert("Failed to sync. Please ensure the backend is running.");
    } finally {
      setIsSyncing(false);
    }
  };
  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar overlay"
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-white/10 bg-[#0d0d16]/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 light:border-slate-200 light:bg-white/95 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-500 shadow-lg shadow-violet-700/30">
              <BrainCircuit className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold">
                <span className="text-white light:text-black">Brain</span>
                <span className="text-violet-500">Vault</span>
              </h1>
              <p className="text-xs text-zinc-400 light:text-slate-500">
                Enterprise AI OS
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-700/30"
                      : "text-zinc-400 hover:bg-white/[0.07] hover:text-white light:text-slate-600 light:hover:bg-slate-100 light:hover:text-slate-950",
                  )
                }
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4">
          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-4">
            <div className="flex items-center gap-2">
              <span className={clsx(
                "h-2.5 w-2.5 rounded-full shadow-lg",
                isSyncing ? "bg-amber-400 shadow-amber-500/50 animate-pulse" : "bg-emerald-400 shadow-emerald-500/50"
              )} />
              <span className="text-sm font-semibold text-white light:text-slate-950">
                {isSyncing ? "Syncing..." : "Brain Online"}
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-zinc-400 light:text-slate-500">
              {sourcesCount} sources synced. Last Vector refresh completed {lastSyncTime}.
            </p>
            <button
              type="button"
              disabled={isSyncing}
              onClick={handleSync}
              className="mt-4 w-full rounded-2xl bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed light:bg-slate-100 light:text-slate-800"
            >
              {isSyncing ? "Syncing..." : "Run Sync"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
