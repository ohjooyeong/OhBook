import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
    {
        userFrom: {
            type: schema.Types.ObjectId,
            ref: "User",
        },
        bookId: {
            type: String,
        },
        bookTitle: {
            type: String,
        },
        bookPost: {
            type: String,
        },
        bookAuthor: {
            type: String,
        },
    },
    { timestamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
