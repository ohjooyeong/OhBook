import mongoose from "mongoose";

const schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
    {
        writer: {
            type: schema.Types.ObjectId,
            ref: "User",
        },
        postId: {
            type: String,
        },
        content: {
            type: String,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
