import express from "express";
import axios from "axios";

const bookApiRouter = express.Router();

bookApiRouter.get("/bestSeller", async (req, res) => {
    try {
        const response = await axios.get(
            `http://book.interpark.com/api/bestSeller.api?key=${process.env.API_KEY}&categoryId=100&output=json`
        );
        return res.status(200).json({
            success: true,
            response: response.data,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
});

bookApiRouter.get("/recommend", async (req, res) => {
    try {
        const response = await axios.get(
            `http://book.interpark.com/api/recommend.api?key=${process.env.API_KEY}&categoryId=100&output=json`
        );
        return res.status(200).json({
            success: true,
            response: response.data,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
});

bookApiRouter.get("/newBook", async (req, res) => {
    try {
        const response = await axios.get(
            `http://book.interpark.com/api/newBook.api?key=${process.env.API_KEY}&categoryId=100&output=json`
        );
        return res.status(200).json({
            success: true,
            response: response.data,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
});

export default bookApiRouter;
