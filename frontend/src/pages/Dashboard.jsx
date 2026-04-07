import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import Navbar from "../components/Navbar";

const cardStyles = [
  "bg-gradient-to-br from-rose-500 via-orange-400 to-yellow-300 text-slate-950",
  "bg-gradient-to-br from-sky-500 via-cyan-500 to-lime-300 text-slate-950",
  "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-400 text-slate-100",
];

const Dashboard = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.sessions);
    } catch (error) {
      console.log(error.response);
    }
  };

  const createSession = async () => {
    if (!role || !experience) return alert("Fill all fields");

    try {
      await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role,
        experience,
        questions: [],
      });
      setRole("");
      setExperience("");
      fetchSessions();
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-fuchsia-500 opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-0 h-56 w-56 rounded-full bg-cyan-500 opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-amber-400 opacity-15 blur-3xl" />

        <motion.div
          className="max-w-6xl mx-auto px-6 pb-12 pt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="mb-8 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
                  Interview Studio
                </p>
                <h1 className="text-4xl font-bold text-white sm:text-5xl">
                  Welcome back, {user?.name || 'Candidate'}
                </h1>
                <p className="mt-3 max-w-2xl text-slate-300 sm:text-lg">
                  Your personalized prep workspace is ready.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <motion.div
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-center shadow-xl shadow-slate-950/30"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
                    Total Sessions
                  </p>
                  <p className="mt-3 text-3xl font-bold text-amber-300">
                    {sessions.length}
                  </p>
                </motion.div>
                <motion.div
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-center shadow-xl shadow-slate-950/30"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                >
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
                    Quick Start
                  </p>
                  <p className="mt-3 text-3xl font-bold text-sky-300">+1</p>
                </motion.div>
                <motion.div
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-center shadow-xl shadow-slate-950/30"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                >
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
                    Ready Now
                  </p>
                  <p className="mt-3 text-3xl font-bold text-emerald-300">
                    {sessions.length > 0 ? "Yes" : "No"}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mb-8 rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Create a new session
                </h2>
                <p className="mt-2 text-slate-400">
                  Add a role and experience level to generate a custom prep session.
                </p>
              </div>

              <button
                onClick={createSession}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-rose-500/20 transition duration-200 hover:scale-105"
              >
                Create Session
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <motion.input
                placeholder="Role (Frontend Developer)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-white/10 px-4 py-4 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
                whileFocus={{ scale: 1.005 }}
              />
              <motion.input
                placeholder="Experience (2 yrs)"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-white/10 px-4 py-4 text-slate-100 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                whileFocus={{ scale: 1.005 }}
              />
              <div className="hidden lg:block" />
            </div>
          </motion.div>

          {sessions.length === 0 ? (
            <motion.div
              className="rounded-[32px] border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center text-slate-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 0.95, 1], y: [0, -8, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-xl font-semibold text-white">No sessions yet!</p>
              <p className="mt-3 text-slate-400">
                Start by creating a session and watch the cards come alive.
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {sessions.map((s, index) => (
                <motion.button
                  key={s._id}
                  onClick={() => navigate(`/interview/${s._id}`)}
                  className={`rounded-[32px] p-6 shadow-2xl shadow-slate-950/30 transition focus:outline-none ${cardStyles[index % cardStyles.length]}`}
                  whileHover={{ y: -10, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                      Session {index + 1}
                    </span>
                    <span className="text-sm text-white/90">Tap to open</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">{s.role}</h3>
                  <p className="mt-3 text-sm text-white/90">{s.experience} experience</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
                      AI Practice
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
                      Ready to launch
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;