import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

import QAItem from "../components/QAItems";
import EmptyState from "../components/EmptyState";
import ErrorBanner from "../components/ErrorBanner";
import GenerateButton from "../components/GenerateButton";
import SkeletonCard from "../components/SkeletonCard";
import Navbar from "../components/Navbar";
import { API_PATHS } from "../utils/apiPaths";

import axios from "../utils/axiosInstance";

const parseError = (err) => {
  console.log(err);
  if (err.response)
    return (
      err.response.data?.message ||
      err.response.data?.error ||
      `Server error: ${err.response.status}`
    );
  if (err.request) return "Cannot reach server. Check your connection.";
  return err.message || "Something went wrong.";
};

const InterviewPrep = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await axios.get(`${API_PATHS.SESSION.GET_ONE}/${id}`);
      setQuestions(res.data.session.questions || []);
    } catch (err) {
      console.log(err.response);
      setFetchError(parseError(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  const generateQuestions = async () => {
    setGenerating(true);
    try {
      await axios.post(API_PATHS.AI.GENERATE_QUESTIONS, { sessionId: id });
      await fetchQuestions();
      toast.success("Questions generated!");
    } catch (err) {
      toast.error(parseError(err));
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 min-h-screen">
        <div className="pointer-events-none absolute -top-16 -left-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute top-10 right-0 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />

        <Toaster
          position="top-right"
          toastOptions={{ className: "!text-sm !font-medium" }}
        />

        <motion.div
          className="max-w-5xl mx-auto px-6 py-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="mb-8 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/75">
                  Question Dashboard
                </p>
                <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
                  Session Question Studio
                </h1>
                <p className="mt-3 max-w-2xl text-slate-300 sm:text-lg">
                  Smooth motion, vivid visuals, and interactive question cards for every session.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <motion.div
                  className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-center shadow-xl shadow-slate-950/30"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Session ID
                  </p>
                  <p className="mt-3 text-xl font-semibold text-white">
                    {id?.slice(0, 8)}
                  </p>
                </motion.div>
                <motion.div
                  className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-center shadow-xl shadow-slate-950/30"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Questions Ready
                  </p>
                  <p className="mt-3 text-xl font-semibold text-cyan-300">
                    {questions.length}
                  </p>
                </motion.div>
                <motion.div
                  className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-center shadow-xl shadow-slate-950/30"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Status
                  </p>
                  <p className="mt-3 text-xl font-semibold text-emerald-300">
                    {questions.length > 0 ? "Ready" : "Empty"}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mb-8 rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Ready to power up your session?
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Generate instant AI questions with one click.
                </h2>
              </div>
              <GenerateButton
                onClick={generateQuestions}
                generating={generating}
                loading={loading}
              />
            </div>
          </motion.div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : fetchError ? (
            <ErrorBanner message={fetchError} onRetry={fetchQuestions} />
          ) : questions.length === 0 ? (
            <motion.div
              className="rounded-[32px] border border-dashed border-slate-700 bg-slate-950/60 p-14 text-center text-slate-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 0.95, 1], y: [0, -10, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-xl font-semibold text-white">No questions yet</p>
              <p className="mt-3 text-slate-400">
                Generate AI-powered questions to fill this session dashboard.
              </p>
              <div className="mt-6 flex justify-center">
                <GenerateButton
                  onClick={generateQuestions}
                  generating={generating}
                  loading={loading}
                />
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
              >
                {questions.map((q, i) => (
                  <motion.div
                    key={q._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <QAItem item={q} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default InterviewPrep;