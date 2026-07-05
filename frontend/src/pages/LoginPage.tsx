import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrainCircuit, Lock, Mail, User, ChevronRight } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard/home", { replace: true });
    }
  }, [navigate]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Employee");
  const [selectedDepartment, setSelectedDepartment] = useState("Product");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid business email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Set auth storage values
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", selectedRole);
    localStorage.setItem("department", selectedDepartment);
    localStorage.setItem("fullName", fullName);

    // Redirect to dashboard home
    navigate("/dashboard/home", { replace: true });
  };

  const handleSocialLogin = (provider: string) => {
    // Fill mock values and perform login
    const nameMap: Record<string, string> = {
      Google: "Google User",
      Microsoft: "Microsoft User"
    };
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", "Admin");
    localStorage.setItem("department", "Engineering");
    localStorage.setItem("fullName", nameMap[provider] || "Enterprise User");

    navigate("/dashboard/home", { replace: true });
  };

  const roles = [
    "Employee",
    "Team Lead",
    "Manager",
    "HR Manager",
    "Product Manager",
    "Finance Manager",
    "Director",
    "VP",
    "Admin",
  ];

  const departments = [
    "HR",
    "Finance",
    "Product",
    "Engineering",
    "Support",
    "Sales",
    "Marketing",
    "Operations",
    "Legal",
  ];

  return (
    <div className="min-h-screen bg-[#07070C] text-slate-100 flex flex-col lg:flex-row relative">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vh] rounded-full bg-gradient-to-br from-violet-900/10 via-transparent to-transparent blur-[160px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vh] rounded-full bg-gradient-to-tl from-indigo-900/15 via-transparent to-transparent blur-[160px]" />
      </div>

      {/* LEFT SIDE - BRANDING */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#09090F] border-r border-white/5 relative flex-col justify-between p-12 overflow-hidden z-10">
        {/* Glow meshes */}
        <div className="absolute top-[30%] left-[20%] w-72 h-72 bg-violet-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-60 h-60 bg-indigo-600/10 rounded-full blur-[100px]" />
        
        {/* Top Header */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 shadow-md shadow-violet-700/20">
            <BrainCircuit className="text-white" size={20} />
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-white">Brain</span>
            <span className="text-violet-500">Vault</span>
          </span>
        </div>

        {/* Product Illustration Mockup */}
        <div className="my-auto space-y-8 max-w-lg">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
              Secure enterprise intelligence at your fingertips.
            </h2>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Connect your systems under strict SOC2 governance. Map connections between customer messages, code check-ins, and financial briefs in real-time.
            </p>
          </div>

          {/* Interactive illustration mockup card */}
          <div className="bg-[#0d0d16]/80 border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-full blur-xl" />
            
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-300">Company Synapse Network</span>
              </div>
              <span className="text-[10px] text-zinc-500">RBAC Active</span>
            </div>

            <div className="mt-4 space-y-3">
              {/* node link mockup */}
              <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-xl p-2.5 text-xs">
                <span className="font-semibold text-slate-200">Engineering Wiki doc</span>
                <ChevronRight size={14} className="text-slate-500" />
                <span className="text-violet-400 font-semibold font-mono">Q2 Roadmaps</span>
              </div>
              <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-xl p-2.5 text-xs">
                <span className="font-semibold text-slate-200">Zendesk Escalations</span>
                <ChevronRight size={14} className="text-slate-500" />
                <span className="text-indigo-400 font-semibold font-mono">Product Specs v3</span>
              </div>
            </div>
          </div>

          {/* Mini Stats Grid */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
            <div>
              <div className="text-xl font-bold text-white">10M+</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Docs Indexed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">99.9%</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Uptime SLA</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">500+</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Enterprises</div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-slate-500 flex justify-between">
          <span>© 2026 BrainVault</span>
          <span className="flex gap-3">
            <span className="hover:underline cursor-pointer">Security</span>
            <span className="hover:underline cursor-pointer">Privacy</span>
          </span>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-20 z-10">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 mb-8 self-start">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500">
            <BrainCircuit className="text-white" size={18} />
          </div>
          <span className="text-base font-bold tracking-tight">
            <span className="text-white">Brain</span>
            <span className="text-violet-500">Vault</span>
          </span>
        </div>

        <div className="w-full max-w-[420px] space-y-8 bg-[#09090F]/45 sm:bg-[#0d0d16]/30 border border-white/0 sm:border-white/5 rounded-3xl p-0 sm:p-8 backdrop-blur-none sm:backdrop-blur-xl">
          
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-400">
              Sign in to access your company's cognitive core.
            </p>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl p-3.5 text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  id="fullName"
                  placeholder="Priya Sharma"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setError("");
                  }}
                  className="w-full rounded-xl border border-white/10 bg-[#111118] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-violet-500 transition placeholder:text-zinc-600"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300" htmlFor="email">
                Business Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  id="email"
                  placeholder="priya@company.ai"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="w-full rounded-xl border border-white/10 bg-[#111118] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-violet-500 transition placeholder:text-zinc-600"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full rounded-xl border border-white/10 bg-[#111118] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-violet-500 transition placeholder:text-zinc-600"
                  required
                />
              </div>
            </div>

            {/* Position and Department Selectors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300" htmlFor="position">
                  Position
                </label>
                <select
                  id="position"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#111118] py-2.5 px-3 text-sm text-white outline-none focus:border-violet-500 transition appearance-none cursor-pointer"
                >
                  {roles.map((role) => (
                    <option key={role} value={role} className="bg-[#111118] text-white">
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300" htmlFor="department">
                  Department
                </label>
                <select
                  id="department"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#111118] py-2.5 px-3 text-sm text-white outline-none focus:border-violet-500 transition appearance-none cursor-pointer"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept} className="bg-[#111118] text-white">
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/10 bg-white/5 text-violet-600 focus:ring-0 focus:ring-offset-0 h-4 w-4"
                />
                Remember Me
              </label>
              <span className="text-violet-400 hover:text-violet-300 font-semibold cursor-pointer">
                Forgot Password?
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-semibold text-sm text-white shadow-lg shadow-violet-700/20 hover:shadow-violet-600/30 transition hover:scale-[1.01] active:scale-[0.99] mt-2 cursor-pointer"
            >
              Sign In
            </button>

          </form>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#07070C] sm:bg-[#0c0c14] px-3 text-zinc-500 font-semibold">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Sign-In Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("Google")}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-[#111118]/80 hover:bg-white/[0.04] py-2.5 text-xs text-slate-300 transition hover:text-white font-medium cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("Microsoft")}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-[#111118]/80 hover:bg-white/[0.04] py-2.5 text-xs text-slate-300 transition hover:text-white font-medium cursor-pointer"
            >
              <div className="w-3.5 h-3.5 flex flex-wrap gap-[2px]">
                <div className="w-1.5 h-1.5 bg-[#F25022]" />
                <div className="w-1.5 h-1.5 bg-[#7FBA00]" />
                <div className="w-1.5 h-1.5 bg-[#00A4EF]" />
                <div className="w-1.5 h-1.5 bg-[#FFB900]" />
              </div>
              Microsoft
            </button>
          </div>

          {/* Create Account Link */}
          <div className="text-center text-xs text-slate-500">
            Don't have an account?{" "}
            <span className="text-violet-400 hover:text-violet-300 font-semibold cursor-pointer">
              Create Account
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
