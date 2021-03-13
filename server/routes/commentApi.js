import express from "express";
import { auth } from "../middleware/auth";
import Comment from "../models/Comment";

const commentApiRouter = express.Router();

commentApiRouter.post("/saveComment", auth, (req, res) => {
    const comment = new Comment(req.body);

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err });

        Comment.find({ _id: comment._id })
            .populate("writer")
            .exec((err, result) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).json({ success: true, result });
            });
    });
});

commentApiRouter.post("/getComments", (req, res) => {
    Comment.find({ postId: req.body.id })
        .populate("writer")
        .exec((err, comments) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, comments: comments });
        });
});

commentApiRouter.post("/removeComments", (req, res) => {
    Comment.findOneAndDelete({ _id: req.body.id }).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, doc });
    });
});

export default commentApiRouter;
