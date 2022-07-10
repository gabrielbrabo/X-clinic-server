import mongoose from "mongoose";

const userschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            index: {
                unique: true
            },
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
        },
        patients: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'patients'
            }
        ],
    },
    {
        timestamps: true
    }
);

export default mongoose.model("user", userschema);