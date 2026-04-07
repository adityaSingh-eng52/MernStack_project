import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("Missing JWT_SECRET in backend/.env");
  process.exit(1);
}

if (!process.env.GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY in backend/.env");
  process.exit(1);
}

import express from "express";
import { connectDB } from "./config/database-config.js";
import cors from "cors";
import userRoutes from "./routes/auth-route.js";
import sessionRoutes from "./routes/session-route.js";
import aiRoutes from "./routes/ai-route.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", userRoutes); // https://localhost:9000/api/auth/signup
app.use("/api/sessions", sessionRoutes); // https://localhost:9000/api/sessions/create
app.use("/api/ai", aiRoutes); // https://localhost:9000/api/ai/generate-questions

app.get("/", (req, res) => {
    // res.json({
    // success:true,
    // message:"Okay",
    // data: { userName: "abc"},
    res.json({
        // res.status(500).json({

        success: false,
        message: "error occured",
        err: {name:"some error"},
    })
});
app.get("/about", (req, res) => {
    res.status(122).json({message: "hi"});
});

// 3) assign a port number to our server

const PORT = process.env.PORT || 9000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}......`);
  });
};

startServer();
//app.listen(PORT_NUMBER, callback)

//!to check if the server is running, in cmd(git bash),goto backend folder and type "npx nodemon index.js"
//open browser -> localhost:PORT_NUMBER and press enter

//https://nodejs.org/en/ (/)=> this is base url
//https://nodejs.org/en/blog => blog is one endpoint