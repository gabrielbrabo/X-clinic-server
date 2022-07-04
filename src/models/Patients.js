import mongoose from "mongoose";

const patients = (
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        },
        name: {
            type: String,
            requires: true,
        },
        email: {
            type: String,
            requires: true,
            unique: true
        },
    }
);

export default mongoose.model("patients", patients );