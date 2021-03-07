import express from "express";
import axios from "axios";

const bookApiRouter = express.Router();

bookApiRouter.get("/bestseller", async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.API_URL}/bestSeller.api?key=${process.env.API_KEY}&categoryId=100&output=json`
        );
        return res.status(200).json({
            success: true,
            response: response.data,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
});

bookApiRouter.get("/newbook", async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.API_URL}/newBook.api?key=${process.env.API_KEY}&categoryId=100&output=json`
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
            `${process.env.API_URL}/recommend.api?key=${process.env.API_KEY}&categoryId=100&output=json`
        );
        return res.status(200).json({
            success: true,
            response: response.data,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
});

bookApiRouter.post("/category", async (req, res) => {
    const {
        body: { categoryId },
    } = req;
    let category = Number(categoryId);
    try {
        const response = await axios.get(
            `${process.env.API_URL}/newBook.api?key=${process.env.API_KEY}&categoryId=${category}&output=json`
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
