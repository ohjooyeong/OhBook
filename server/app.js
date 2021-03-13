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
import favoriteApiRouter from "./routes/favoriteApi";
import commentApiRouter from "./routes/commentApi";

import config from "./config/key";

const app = express();

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/books", bookApiRouter);
app.use("/api/users", userApiRouter);
app.use("/api/favorite", favoriteApiRouter);
app.use("/api/comments", commentApiRouter);

export default app;
