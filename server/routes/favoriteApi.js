import express from "express";
import Favorite from "../models/Favorite";

const favoriteApiRouter = express.Router();

favoriteApiRouter.post("/favoriteNumber", (req, res) => {
    // 몽고디비에서 favorite 숫자를 가져오기
    Favorite.find({ bookId: req.body.bookId }).exec((err, info) => {
        if (err) return res.status(400).send(err);
        // 그다음에 프론트에 다시 숫자 정보 보내주기
        res.status(200).json({ success: true, favoriteNumber: info.length });
    });
});

favoriteApiRouter.post("/favorited", (req, res) => {
    Favorite.find({ bookId: req.body.bookId, userFrom: req.body.userFrom }).exec((err, info) => {
        if (err) return res.status(400).send(err);
        let result = false;
        if (info.length !== 0) {
            result = true;
        }
        res.status(200).json({ success: true, favorited: result });
    });
});

favoriteApiRouter.post("/addToFavorite", (req, res) => {
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true });
    });
});

favoriteApiRouter.post("/removeFromFavorite", (req, res) => {
    Favorite.findOneAndDelete({ bookId: req.body.bookId, userFrom: req.body.userFrom }).exec(
        (err, doc) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, doc });
        }
    );
});

favoriteApiRouter.post("/getFavoredBook", (req, res) => {
    Favorite.find({ userFrom: req.body.userFrom }).exec((err, favoriteList) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, favoriteList });
    });
});

export default favoriteApiRouter;
