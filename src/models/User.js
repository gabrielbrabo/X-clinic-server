import mongoose from "mongoose";

const userschema = new mongoose.Schema(
    {
        name: {
            type: String,
            requires: true,
        },
        email: {
            type: String,
            requires: true,
            index: {
                unique: true
            },
            unique: true
        },
        password: {
            type: String,
            requires: true,
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("user", userschema);