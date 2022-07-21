import mongoose from "mongoose";

const patients = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
        },
        IDclinic: {
            type: mongoose.Types.ObjectId, 
            ref: 'user',
            required: true,
        },
        brithData: {
            type: String,
            required: true
        },
        sexo: {
            type: String,
            required: false,
        },
        diagnosis: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        },
        rg: {
            type: String,
            required: true
        },
        cell: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: false,
        },
    }
);

export default mongoose.model("patients", patients );