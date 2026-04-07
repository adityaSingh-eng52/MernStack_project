import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const features = [
  {
    title: "Create Sessions",
    description: "Build a tailored prep plan for your next interview.",
    accent: "from-rose-500 to-orange-400",
  },
  {
    title: "Generate Questions",
    description: "Use AI to instantly generate real interview questions.",
    accent: "from-cyan-500 to-sky-500",
  },
  {
    title: "Track Progress",
    description: "Review your session history and improve fast.",
    accent: "from-violet-500 to-fuchsia-500",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <Navbar />

      <div className="relative">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500 opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute top-10 right-8 h-56 w-56 rounded-full bg-cyan-500 opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-64 w-64 rounded-full bg-amber-400 opacity-10 blur-3xl" />

        <motion.section
          className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl flex-col justify-center px-6 py-12 lg:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300 shadow-sm shadow-emerald-500/10">
                AI Interview Prep
              </span>
              <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
                Practice smarter, prepare faster.
              </h1>
              <p className="max-w-2xl text-slate-300 sm:text-lg">
                Create interactive interview sessions, generate AI-powered questions, and track progress with smooth animations and rich visuals.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <motion.button
                  onClick={() => navigate("/signup")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400 px-7 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-rose-500/30 transition"
                >
                  Start Free
                </motion.button>
                <motion.button
                  onClick={() => navigate("/login")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-base font-semibold text-white shadow-sm shadow-slate-950/20 transition"
                >
                  Login
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-[36px] border border-white/10 bg-white/5 p-1 shadow-2xl shadow-slate-950/30"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="overflow-hidden rounded-[35px] bg-gradient-to-br from-slate-900 to-slate-800 p-8">
                <div className="mb-6 rounded-3xl bg-slate-950/90 p-6 shadow-inner shadow-slate-950/20">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-2xl bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">
                      Live preview
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      3 min to start
                    </span>
                  </div>
                  <h2 className="mt-6 text-3xl font-semibold text-white">
                    Session builder
                  </h2>
                  <p className="mt-3 text-slate-400">
                    Add roles, set experience, and generate questions instantly.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className={`rounded-3xl border border-white/10 bg-white/5 p-5 shadow-sm ${index === 1 ? "sm:col-span-2" : ""}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 + index * 0.08 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`mb-3 h-2 w-16 rounded-full bg-gradient-to-r ${feature.accent}`} />
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default LandingPage;