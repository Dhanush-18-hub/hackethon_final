import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  Search,
  FileText,
  Share2,
  CheckSquare,
  BarChart3,
  Shield,
  ArrowRight,
  Sparkles,
  Play,
  Quote,
  ChevronRight,
  Database,
  Globe,
  Cpu
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeUseCase, setActiveUseCase] = useState("Product");
  const [showLoader, setShowLoader] = useState(true);

  const useCases = {
    HR: {
      title: "Streamline Onboarding & Policies",
      description: "Allow employees to instantly ask questions about health benefits, remote work guidelines, and compliance documentation without pinging HR.",
      metric: "Reduces duplicate HR tickets by 72%",
      points: ["Instant handbook searching", "Automated vacation balance lookups", "Personalized benefits guidance"],
      previewContent: {
        query: "What is our policy on remote work and stipend?",
        response: "BrainVault: Employees can work remotely up to 3 days a week. A $500 annual home office stipend is available. Submit invoices via ExpenseBot by December 15th.",
        sources: ["HR Handbook 2026.pdf", "Remote Work Policy v2"]
      }
    },
    Finance: {
      title: "Query Reports & Analyze Forecasts",
      description: "Connect spreadsheets, ERP exports, and vendor invoices to extract summary insights and locate anomalies in seconds.",
      metric: "Consolidates reports 4x faster",
      points: ["Q3 planning synthesis", "Vendor payment term lookups", "Audit trial document queries"],
      previewContent: {
        query: "Find the payment terms for vendor Stripe Inc.",
        response: "BrainVault: Net 30 terms apply to all Stripe licensing fees, billed monthly on the 1st. Invoices should be directed to billing@company.ai.",
        sources: ["Stripe Master Service Agreement.pdf"]
      }
    },
    Product: {
      title: "Bridge PRDs, Roadmaps & Feedback",
      description: "Connect customer feedback channels with product roadmaps and engineering specifications. Brain spots duplicate features and gaps.",
      metric: "Accelerates PRD drafting by 60%",
      points: ["Automated PRD outline generation", "Feature dependency mapping", "Customer support feedback grouping"],
      previewContent: {
        query: "What feature request is most common for the analytics dashboard?",
        response: "BrainVault: PDF report exports is mentioned in 28 feedback logs, primarily from enterprise customers. It currently has a dependency on the Scheduled Jobs API task.",
        sources: ["Customer Feedback Q2.csv", "Analytics Specs v4"]
      }
    },
    Support: {
      title: "Resolve Tickets with Citations",
      description: "Feed support logs and product documentation to agents or directly to your chatbot. Support resolves tickets with verified citations.",
      metric: "Improves first-contact resolution by 45%",
      points: ["Draft replies from internal wiki", "Identify duplicate tickets", "Automatic tag recommendation"],
      previewContent: {
        query: "How do we resolve error code 503 during DB sync?",
        response: "BrainVault: Check the connection string format. If SSL is enabled, make sure the RDS root certificate is updated to v3. Restart the background worker pool.",
        sources: ["DB Sync Runbook.md", "Ops Escalation Log #42"]
      }
    },
    Sales: {
      title: "Instantly Query RFPs & Security Docs",
      description: "Answer complex customer questionnaires and RFPs in minutes rather than days, drawing from verified security and product sources.",
      metric: "Saves 15+ hours per sales cycle",
      points: ["RFP auto-fill assistance", "SLA & security requirement search", "Competitor matrix generation"],
      previewContent: {
        query: "Do we support SAML single sign-on and SCIM provisioning?",
        response: "BrainVault: Yes. SAML 2.0 is supported via Okta, Azure AD, and Ping. SCIM 2.0 user provisioning is fully supported for enterprise plans.",
        sources: ["Security Whitepaper 2026.docx", "SSO Configuration.md"]
      }
    },
    Legal: {
      title: "Analyze Contracts & Compliance",
      description: "Parse contracts to find non-standard clauses, liability limits, and expiration dates without manual line-by-line reading.",
      metric: "Reduces contract review time by 55%",
      points: ["Find liability caps", "Identify expiration date alerts", "Compare vendor agreements"],
      previewContent: {
        query: "What is the liability cap in the vendor agreement?",
        response: "BrainVault: The liability cap is set at 1.5x the fees paid in the preceding 12 months, with mutual indemnification for data security breaches.",
        sources: ["Vendor Agreement (Final).pdf"]
      }
    }
  };

  const features = [
    {
      title: "BrainVault Search",
      description: "Ask natural language questions and get accurate answers with inline citations. Search across all databases instantly.",
      icon: Search,
      badge: "Semantic Search",
      color: "from-violet-500 to-indigo-500"
    },
    {
      title: "Document Intelligence",
      description: "Extract text, tables, and structured metadata from PDF, DOCX, CSV, PPTX, and markdown files automatically.",
      icon: FileText,
      badge: "Multi-Format Ingestion",
      color: "from-fuchsia-500 to-pink-500"
    },
    {
      title: "Knowledge Graph",
      description: "Connect scattered documents, tickets, roadmaps, and messages into a visually linked relational knowledge model.",
      icon: Share2,
      badge: "Entity Linking",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Multi-Agent AI",
      description: "Create AI agents that carry out multi-step company workflows, execute cron jobs, and notify the right team members.",
      icon: CheckSquare,
      badge: "Autopilot Agents",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Analytics Dashboard",
      description: "Get real-time insights into workspace activity, active user queries, documentation coverage gaps, and system performance.",
      icon: BarChart3,
      badge: "Deep Analytics",
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Enterprise Compliance",
      description: "SOC2 compliant, military-grade end-to-end encryption, role-based access control (RBAC), and strict data residency options.",
      icon: Shield,
      badge: "Security-First",
      color: "from-rose-500 to-red-500"
    }
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05050A]"
          >
            <div className="absolute h-96 w-96 rounded-full bg-violet-600/10 blur-[100px] animate-pulse" />
            <div className="absolute h-64 w-64 rounded-full bg-indigo-600/10 blur-[80px]" />
            
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                className="absolute h-28 w-28 rounded-full border-2 border-t-violet-500 border-r-indigo-500 border-b-transparent border-l-transparent"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
                className="absolute h-24 w-24 rounded-full border border-b-violet-400 border-l-indigo-400 border-t-transparent border-r-transparent opacity-65"
              />
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-500 shadow-xl shadow-violet-700/20"
              >
                <BrainCircuit className="text-white animate-pulse" size={28} />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 text-center"
            >
              <h1 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-violet-300 bg-clip-text text-transparent">
                BrainVault
              </h1>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">
                Initializing Knowledge Core
              </p>
            </motion.div>
            
            <div className="mt-8 w-56 h-1 rounded-full bg-white/5 overflow-hidden relative">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-violet-500 to-indigo-500"
                onAnimationComplete={() => {
                  setTimeout(() => setShowLoader(false), 150);
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#07070C] text-slate-100 selection:bg-violet-500/30 selection:text-violet-200 overflow-x-hidden">
      
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[5%] w-[80vw] h-[60vh] rounded-full bg-gradient-to-br from-violet-900/20 via-indigo-900/10 to-transparent blur-[160px]" />
        <div className="absolute top-[40%] right-[0%] w-[50vw] h-[50vh] rounded-full bg-gradient-to-br from-fuchsia-900/10 via-pink-900/5 to-transparent blur-[140px]" />
        <div className="absolute bottom-[0%] left-[10%] w-[70vw] h-[50vh] rounded-full bg-gradient-to-tr from-violet-950/15 via-zinc-950/0 to-transparent blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#07070C]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 shadow-md shadow-violet-700/20">
                <BrainCircuit className="text-white" size={20} />
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">Brain</span>
                <span className="text-violet-500">Vault</span>
              </span>
            </div>

            {/* Menu Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-400 hover:text-white transition">Features</a>
              <a href="#solutions" className="text-sm text-slate-400 hover:text-white transition">Solutions</a>
              <a href="#stats" className="text-sm text-slate-400 hover:text-white transition">Pricing</a>
              <a href="#testimonials" className="text-sm text-slate-400 hover:text-white transition">About</a>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-medium text-slate-300 hover:text-white transition px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="/login"
                className="relative group overflow-hidden rounded-xl bg-white text-black font-semibold text-sm px-5 py-2.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition duration-300"
              >
                Get Started
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div
          initial="hidden"
          animate={showLoader ? "hidden" : "visible"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.15
              }
            }
          }}
        >
          {/* Tag / Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-950/20 text-xs font-medium text-violet-300 mb-6 backdrop-blur-sm"
          >
            <Sparkles size={12} className="text-violet-400 animate-pulse" />
            <span>Next-Generation Knowledge OS</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-5xl mx-auto"
          >
            Your Company's Knowledge.{" "}
            <span className="block mt-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              Instantly Searchable. Intelligently Connected.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="mt-8 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            BrainVault transforms documents, policies, roadmaps, tickets, and company knowledge into a powerful AI assistant. Stop digging, start executing.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-700/25 hover:shadow-violet-600/40 hover:scale-[1.02] transition duration-200"
            >
              Start Free <ArrowRight size={18} />
            </button>
            <a
              href="#dashboard-preview"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-8 py-4 font-semibold text-slate-300 hover:text-white transition duration-200"
            >
              <Play size={16} fill="currentColor" /> Watch Demo
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Animated Dashboard Preview Section */}
      <section id="dashboard-preview" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-white/10 bg-[#0d0d16]/60 p-2 sm:p-4 shadow-2xl backdrop-blur-2xl overflow-hidden"
        >
          {/* Window Buttons */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/20 rounded-t-2xl">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-slate-500 font-mono ml-4">https://brain.company.ai/dashboard</span>
          </div>

          <div className="grid lg:grid-cols-[250px_1fr] min-h-[500px] bg-[#09090E]/95">
            {/* Left Nav Mockup */}
            <div className="hidden lg:flex flex-col border-r border-white/5 p-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center">
                  <BrainCircuit size={16} />
                </div>
                <div>
                  <div className="h-3 w-20 bg-white/20 rounded" />
                  <div className="h-2 w-12 bg-white/10 rounded mt-1.5" />
                </div>
              </div>
              <div className="space-y-3 pt-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${i === 2 ? 'bg-violet-600/25 text-violet-300' : 'text-slate-500'}`}>
                    <div className="w-4 h-4 rounded bg-current/25" />
                    <div className="h-2.5 w-24 bg-current/30 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Chat and Graph Mockup */}
            <div className="p-6 flex flex-col justify-between space-y-6">
              
              {/* Top Row with Widgets */}
              <div className="grid md:grid-cols-3 gap-4">
                
                {/* Floating Metric 1 */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Total Indexed Sources</span>
                    <Database className="text-violet-400" size={16} />
                  </div>
                  <div className="mt-2 text-2xl font-bold">184</div>
                  <div className="text-[10px] text-emerald-400 mt-1 flex items-center">
                    +12 added today
                  </div>
                </motion.div>

                {/* Floating Metric 2 */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Knowledge Graph Nodes</span>
                    <Share2 className="text-indigo-400" size={16} />
                  </div>
                  <div className="mt-2 text-2xl font-bold">4.2K</div>
                  <div className="text-[10px] text-indigo-300 mt-1">
                    98.6% relational confidence
                  </div>
                </motion.div>

                {/* Floating Metric 3 */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
                  className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Active Copilots</span>
                    <Cpu className="text-fuchsia-400" size={16} />
                  </div>
                  <div className="mt-2 text-2xl font-bold">12</div>
                  <div className="text-[10px] text-emerald-400 mt-1">
                    4 sync tasks executing
                  </div>
                </motion.div>

              </div>

              {/* Chat Simulation Area */}
              <div className="flex-1 border border-white/5 bg-black/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-end space-y-4">
                
                {/* User message */}
                <div className="flex items-start gap-3 self-end max-w-[80%]">
                  <div className="bg-violet-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 text-xs sm:text-sm">
                    Summarize the security controls for remote employee laptop provisioning.
                  </div>
                </div>

                {/* AI response */}
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center text-xs shrink-0 font-bold text-white shadow-md shadow-violet-700/20">
                    B
                  </div>
                  <div className="bg-[#11111d] border border-white/5 rounded-2xl rounded-tl-none p-4 text-xs sm:text-sm text-slate-300 space-y-2">
                    <p className="leading-relaxed">
                      Based on the <span className="text-violet-400 font-semibold cursor-pointer underline">Security Playbook v2.pdf</span> and the <span className="text-violet-400 font-semibold cursor-pointer underline">IT Provisioning Policy</span>:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Mandatory MDM enrollment (Jamf/Intune) with zero-touch configuration.</li>
                      <li>Disk encryption (FileVault/BitLocker) enabled before shipment.</li>
                      <li>CrowdStrike Falcon agent pre-installed and set to active prevention mode.</li>
                    </ul>
                    <div className="pt-2 border-t border-white/5 flex gap-2 flex-wrap items-center">
                      <span className="text-[10px] text-slate-500">Citations:</span>
                      <span className="inline-flex items-center gap-1 text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        <FileText size={10} /> Playbook.pdf
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        <Globe size={10} /> IT-Provisioning-Policy
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom input area mock */}
              <div className="relative">
                <input
                  type="text"
                  disabled
                  placeholder="Ask anything, e.g. Find SLA breach risks in our support Zendesk sync..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-3.5 pl-4 pr-12 text-xs sm:text-sm outline-none text-slate-400"
                />
                <button className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg bg-violet-600 p-2 text-white shadow-md">
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold tracking-wider text-violet-400 uppercase">Everything You Need</h2>
          <p className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight">
            Features built for enterprise intelligence.
          </p>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Stop manually summarizing, digging through Slack, or searching Notion. BrainVault connects it all in one platform.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-white/5 bg-[#0d0d16]/30 p-6 hover:border-violet-500/30 hover:bg-violet-950/[0.05] transition-all duration-300"
              >
                {/* Color accents */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/0 to-indigo-500/0 group-hover:from-violet-600/5 group-hover:to-indigo-500/5 transition duration-300" />
                
                {/* Icon box */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] group-hover:bg-violet-600/20 group-hover:text-violet-400 text-slate-200 transition-colors duration-300">
                  <Icon size={22} />
                </div>
                
                <span className="mt-4 inline-block text-[10px] font-semibold tracking-wider text-violet-400 uppercase bg-violet-450/10 px-2 py-0.5 rounded">
                  {feat.badge}
                </span>
                
                <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-violet-300 transition-colors">
                  {feat.title}
                </h3>
                
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Enterprise Use Cases Section */}
      <section id="solutions" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5 bg-gradient-to-b from-transparent via-violet-950/[0.02] to-transparent">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-semibold tracking-wider text-violet-400 uppercase">Tailored Solutions</h2>
          <p className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight">
            One brain, every department.
          </p>
          <p className="mt-4 text-slate-400">
            Switch tabs to see how our platform handles unique department requirements and connects their specific knowledge stacks.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-stretch">
          
          {/* Selectors and Info */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-2 gap-2">
              {Object.keys(useCases).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveUseCase(key)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold border transition text-center lg:text-left ${
                    activeUseCase === key
                      ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-700/20"
                      : "bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            <div className="bg-[#0d0d16]/40 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4">
              <span className="inline-block text-[11px] font-bold tracking-widest text-violet-400 uppercase">
                {activeUseCase} USE CASE
              </span>
              <h3 className="text-2xl font-bold text-white">
                {useCases[activeUseCase as keyof typeof useCases].title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {useCases[activeUseCase as keyof typeof useCases].description}
              </p>
              
              <div className="pt-2">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-500/20">
                  {useCases[activeUseCase as keyof typeof useCases].metric}
                </span>
              </div>

              <div className="pt-4 space-y-2 border-t border-white/5">
                {useCases[activeUseCase as keyof typeof useCases].points.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <ChevronRight size={14} className="text-violet-400 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solution Preview Area */}
          <div className="flex flex-col justify-between border border-white/5 bg-[#09090f]/90 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl" />
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-400 shadow-md" />
                <span className="text-xs text-slate-400 font-medium">Department Brain Workspace</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Syncing active</span>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-6 py-4">
              {/* Question */}
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">User Query</p>
                <div className="bg-violet-600/10 border border-violet-500/10 rounded-xl px-4 py-3 text-sm text-violet-300 font-medium">
                  "{useCases[activeUseCase as keyof typeof useCases].previewContent.query}"
                </div>
              </div>

              {/* Response */}
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">AI Synapse Response</p>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-4 text-sm text-slate-300 leading-relaxed font-mono">
                  {useCases[activeUseCase as keyof typeof useCases].previewContent.response}
                </div>
              </div>

              {/* Citations */}
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Indexed Citations</p>
                <div className="flex gap-2 flex-wrap">
                  {useCases[activeUseCase as keyof typeof useCases].previewContent.sources.map((src, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 text-xs bg-white/5 px-3 py-1 rounded-lg border border-white/5 text-slate-300">
                      <FileText size={12} className="text-slate-400" />
                      {src}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 text-center">
              <span className="text-xs text-slate-500">
                Connected data stores: Google Drive, Notion, Slack, Jira, GitHub, SharePoint
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="relative z-10 py-20 border-t border-white/5 bg-[#09090f]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-black text-white bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                10M+
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-wider text-slate-400 uppercase">
                Documents Indexed
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-black text-white bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-wider text-slate-400 uppercase">
                Companies Configured
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-black text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                99.9%
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-wider text-slate-400 uppercase">
                API Uptime SLA
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-black text-white bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-wider text-slate-400 uppercase">
                AI Availability
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold tracking-wider text-violet-400 uppercase">Proven Results</h2>
          <p className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight">
            Trusted by modern teams.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Testimonial 1 */}
          <div className="bg-[#0d0d16]/30 border border-white/5 rounded-2xl p-6 relative flex flex-col justify-between">
            <Quote className="absolute top-6 right-6 text-white/[0.03]" size={64} />
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              "BrainVault completely transformed our IT onboarding. Instead of sending engineers digging through 40-page setup PDFs, they ask the assistant. It has reduced setup questions to nearly zero."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center font-bold text-white text-xs">
                JD
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Jason Davis</h4>
                <p className="text-[10px] text-slate-400">VP of Engineering at CloudFlux</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-[#0d0d16]/30 border border-white/5 rounded-2xl p-6 relative flex flex-col justify-between">
            <Quote className="absolute top-6 right-6 text-white/[0.03]" size={64} />
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              "We connected our sales contract database and standard security reports. We can draft security questionnaire responses in minutes with links directly to our policies. An absolute game-changer for sales cycles."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-xs">
                MC
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Maria Chen</h4>
                <p className="text-[10px] text-slate-400">Head of Sales Operations, Netscale</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-[#0d0d16]/30 border border-white/5 rounded-2xl p-6 relative flex flex-col justify-between">
            <Quote className="absolute top-6 right-6 text-white/[0.03]" size={64} />
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              "Connecting our finance documentation and roadmap files let us spot resource overlaps that normally slip by until quarterly reviews. Having an auto-updating graph of company activity saves massive sync overhead."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center font-bold text-white text-xs">
                SR
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Sarah Reynolds</h4>
                <p className="text-[10px] text-slate-400">Director of Product at Vertex Corp</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/20 via-[#0d0d16]/90 to-[#07070c] p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
          {/* Background lights inside card */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(124,58,237,0.15),transparent_60%)] pointer-events-none" />
          
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Turn company knowledge into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              company intelligence.
            </span>
          </h2>
          
          <p className="mt-6 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Get started in under 5 minutes. Securely connect your corporate tools, configure roles, and watch BrainVault map the connections instantly.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white text-black px-6 py-3 font-semibold text-sm shadow-lg hover:shadow-white/20 hover:scale-[1.02] transition"
            >
              Start Free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] px-6 py-3 font-semibold text-sm text-white transition"
            >
              Book Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/5 text-slate-500">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500">
                <BrainCircuit className="text-white" size={18} />
              </div>
              <span className="text-sm font-bold tracking-tight">
                <span className="text-white">Brain</span>
                <span className="text-violet-500">Vault</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Enterprise search, automated summaries, and multi-agent workflow triggers powered by secure relational vector mapping.
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-slate-300">Semantic Search</a></li>
              <li><a href="#features" className="hover:text-slate-300">Multi-Agent AI</a></li>
              <li><a href="#solutions" className="hover:text-slate-300">Integrations</a></li>
              <li><a href="#stats" className="hover:text-slate-300">Enterprise RBAC</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-slate-300 cursor-pointer">Blog</span></li>
              <li><span className="hover:text-slate-300 cursor-pointer">Security Playbook</span></li>
              <li><span className="hover:text-slate-300 cursor-pointer">Knowledge Graph FAQ</span></li>
              <li><span className="hover:text-slate-300 cursor-pointer">API Status</span></li>
            </ul>
          </div>

          {/* Compliance Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-slate-300 cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-slate-300 cursor-pointer">GDPR Compliance</span></li>
              <li><span className="hover:text-slate-300 cursor-pointer">SOC2 Certificate</span></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs">
          <span>© 2026 BrainVault Inc. All rights reserved.</span>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <span className="hover:text-slate-300 cursor-pointer">Twitter</span>
            <span className="hover:text-slate-300 cursor-pointer">LinkedIn</span>
            <span className="hover:text-slate-300 cursor-pointer">GitHub</span>
          </div>
        </div>
      </footer>

      </div>
    </>
  );
}
