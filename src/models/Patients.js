import mongoose from "mongoose";

const patients = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
        },
        user: {
            type: mongoose.Types.ObjectId, 
            ref: 'user',
            required: true,
        },
    }
);

export default mongoose.model("patients", patients );