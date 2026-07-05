import { useState } from "react";
import { Bell, ChevronDown, Menu, Search, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { sidebarItems } from "./SidebarData";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const currentPage =
    sidebarItems.find((item) => item.path === location.pathname)?.title ?? "Home";

  // Read logged-in user credentials
  const fullName = localStorage.getItem("fullName") || "Priya Sharma";
  const userRole = localStorage.getItem("userRole") || "Admin";
  const department = localStorage.getItem("department") || "Product";

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("department");
    localStorage.removeItem("fullName");
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#09090B]/90 px-4 py-4 backdrop-blur-xl light:border-slate-200 light:bg-slate-50/90 sm:px-6 lg:px-7">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-2xl border border-white/10 bg-white/[0.06] p-2.5 text-zinc-200 lg:hidden"
          >
            <Menu size={18} />
          </button>
          <div>
            <p className="text-xs text-zinc-500 light:text-slate-500">
              Workspace / {currentPage}
            </p>
            <h2 className="text-lg font-semibold text-white light:text-slate-950">
              {currentPage}
            </h2>
          </div>
        </div>

        <div className="relative hidden min-w-[260px] max-w-xl flex-1 md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            placeholder="Search company knowledge..."
            className="w-full rounded-2xl border border-white/10 bg-[#111118] py-2.5 pl-10 pr-16 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-400 light:border-slate-200 light:bg-white light:text-slate-950"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-white/10 px-2 py-1 text-[10px] font-medium text-zinc-400 light:bg-slate-100">
            Ctrl K
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="relative rounded-2xl border border-white/10 bg-[#111118] p-2.5 text-zinc-200 transition hover:border-violet-400/50 hover:bg-white/[0.1] light:border-slate-200 light:bg-white light:text-slate-700"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-400" />
          </button>

          {/* User Profile Dropdown Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111118] py-1.5 pl-2 pr-3 transition hover:bg-white/[0.1] light:border-slate-200 light:bg-white cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white uppercase">
                {getInitials(fullName)}
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-white light:text-slate-950">
                  {fullName}
                </p>
                <p className="text-xs text-zinc-500 light:text-slate-500">
                  {department} · {userRole}
                </p>
              </div>
              <ChevronDown size={16} className="text-zinc-500" />
            </button>

            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-white/10 bg-[#0d0d16] p-2 shadow-2xl z-40 backdrop-blur-xl light:border-slate-200 light:bg-white">
                  <div className="px-3 py-2 border-b border-white/5 light:border-slate-100">
                    <p className="text-xs text-zinc-500 light:text-slate-500">Signed in as</p>
                    <p className="text-sm font-semibold text-white light:text-slate-900 truncate">{fullName}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-rose-400 hover:bg-white/[0.05] light:hover:bg-slate-100 transition mt-1 cursor-pointer"
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

