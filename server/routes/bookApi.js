import express from "express";
import axios from "axios";
import qs from "querystring";

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

bookApiRouter.post("/search", async (req, res) => {
    const {
        body: {
            params: { SearchTerm },
        },
    } = req;
    let term = qs.escape(SearchTerm);
    try {
        const response = await axios.get(
            `${process.env.API_URL}/search.api?key=${process.env.API_KEY}&query=${term}&queryType=all&categoryId=100&output=json`
        );
        return res.status(200).json({
            success: true,
            response: response.data,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
});

bookApiRouter.post("/detail", async (req, res) => {
    const {
        body: { id: id },
    } = req;
    try {
        const response = await axios.get(
            `${process.env.API_URL}/search.api?key=${process.env.API_KEY}&query=${id}&queryType=isbn&categoryId=100&output=json`
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
