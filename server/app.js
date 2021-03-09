import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import morgan from "helmet";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";

import bookApiRouter from "./routes/bookApi";
import userApiRouter from "./routes/userApi";

import config from "./config/key";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.use("/api/books", bookApiRouter);
app.use("/api/users", userApiRouter);

export default app;
