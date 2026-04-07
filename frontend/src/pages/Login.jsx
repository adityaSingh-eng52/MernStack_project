import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleForm = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(API_PATHS.AUTH.LOGIN, form);
      login(res.data);
    } catch (error) {
      alert("Invalid email and password");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-slate-100">
      <div className="pointer-events-none absolute -top-16 left-1/4 h-72 w-72 rounded-full bg-fuchsia-500 opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute top-24 right-8 h-64 w-64 rounded-full bg-cyan-500 opacity-15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400 opacity-10 blur-3xl" />

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
          <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back 👋</h2>
          <p className="text-slate-400 text-center mb-6 text-sm">
            Login to continue your interview preparation
          </p>
        </motion.div>

        <motion.input
          type="email"
          name="email"
          value={form.email}
          placeholder="Enter your email"
          onChange={handleForm}
          whileFocus={{ scale: 1.01 }}
          className="w-full rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 mb-4"
        />

        <motion.input
          type="password"
          name="password"
          value={form.password}
          placeholder="Enter your password"
          onChange={handleForm}
          whileFocus={{ scale: 1.01 }}
          className="w-full rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 mb-6"
        />

        <motion.button
          onClick={handleLogin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-3xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400 px-5 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-rose-500/30 transition"
        >
          Login
        </motion.button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-slate-700"></div>
          <p className="px-3 text-slate-500 text-sm">OR</p>
          <div className="flex-1 h-[1px] bg-slate-700"></div>
        </div>

        <p className="text-center text-sm text-slate-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-300 font-medium hover:text-cyan-100"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;