import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authRoute from "./routes/AuthRoutes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

dotenv.config({ path: path.resolve(__dirname, "./.env") });
mongoose.connect(
    process.env.DB_CONNECT,
    {
        dbName: "project",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => (err ? console.log(err) : null)
);

app.use(express.json());
app.use("/api/user", authRoute);
http.createServer(app).listen(8080);
