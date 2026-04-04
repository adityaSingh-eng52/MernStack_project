import dotenv from "dotenv";
dotenv.config({ quiet: true });

import cors from "cors";
import express from "express";
import { connectDB } from "./config/database-config.js";

import {
  generateConceptExplanation,
  generateInterviewQuestions,
} from "./controller/ai-controller.js";
import { protect } from "./middlewares/auth-middleware.js";
import authRoutes from "./routes/auth-route.js";
import authQuestions from "./routes/question-route.js";
import authSessions from "./routes/session-route.js";

connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sessions", authSessions);
app.use("/api/questions", authQuestions);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("server running at port, ", process.env.PORT);
});
