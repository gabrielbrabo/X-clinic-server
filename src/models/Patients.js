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
            unique: true,
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
        cpf: {
            type: String,
            required: true,
            unique: true,
        },
        rg: {
            type: String,
            required: true,
            unique: true,
        },
        cell: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: false,
        },
        number: {
            type: String,
            required: false,
        },
        district: {
            type: String,
            required: false,
        },
    }
);

export default mongoose.model("patients", patients );