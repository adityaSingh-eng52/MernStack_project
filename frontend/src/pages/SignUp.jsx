import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      setError("");
      const res = await axios.post(API_PATHS.AUTH.SIGNUP, form);
      login(res.data);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Signup failed";
      console.error("Signup error:", error);
      setError(message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-slate-100">
      <div className="pointer-events-none absolute -top-16 left-10 h-72 w-72 rounded-full bg-violet-500 opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute top-16 right-10 h-56 w-56 rounded-full bg-indigo-500 opacity-15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-400 opacity-10 blur-3xl" />

      <motion.div
        className="mx-auto flex max-w-md flex-col rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Create Account 🚀
          </h2>
          <p className="text-slate-400 text-center mb-6 text-sm">
            Start your AI-powered interview preparation
          </p>
        </motion.div>

        <motion.input
          type="text"
          value={form.name}
          placeholder="Enter your name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          whileFocus={{ scale: 1.01 }}
          className="w-full rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 mb-4"
        />

        <motion.input
          type="email"
          value={form.email}
          placeholder="Enter your email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          whileFocus={{ scale: 1.01 }}
          className="w-full rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 mb-4"
        />

        <motion.input
          type="password"
          value={form.password}
          placeholder="Create a password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          whileFocus={{ scale: 1.01 }}
          className="w-full rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 mb-6"
        />

        <motion.button
          type="button"
          onClick={handleSignup}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition"
        >
          Sign Up
        </motion.button>

        {error && (
          <p className="text-center text-sm text-red-500 mt-4">{error}</p>
        )}

        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-slate-700"></div>
          <p className="px-3 text-slate-500 text-sm">OR</p>
          <div className="flex-1 h-[1px] bg-slate-700"></div>
        </div>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-300 font-medium hover:text-cyan-100"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;