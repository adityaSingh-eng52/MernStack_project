import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

const QAItem = ({ item, onPin }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="overflow-hidden rounded-[28px] border border-slate-200/20 bg-white/95 shadow-lg shadow-slate-950/10 mb-4 transition hover:-translate-y-1 hover:shadow-2xl"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-left flex-1"
        >
          <h3 className="text-lg font-semibold text-slate-900">
            {item.question}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {open ? "Hide answer" : "Tap to reveal answer"}
          </p>
        </button>

        <button
          type="button"
          onClick={() => onPin?.(item._id)}
          className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-200"
        >
          {item.pinned ? "📌 Pinned" : "📍 Pin"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="border-t border-slate-200/80 bg-slate-50/90 p-5 text-slate-700"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <ReactMarkdown>{item.answer}</ReactMarkdown>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QAItem;