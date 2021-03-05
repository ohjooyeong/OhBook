import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import morgan from "helmet";
import helmet from "helmet";
import cors from "cors";

import bookApi from "./routes/bookApi";

const app = express();

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/books", bookApi);

export default app;
