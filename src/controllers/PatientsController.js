import Patients from '../models/Patients'
import User from '../models/User'

class PatientsController {

    async create(req, res) {
        const newPatient = new Patients({
            ...req.body,
            user: req.userId
        })

        try {
            const patient = await newPatient.save()
            await User.updateOne({
                _id: req.userId
            }, {
                $push: {
                    patients: patient._id      
                }
            })
            res.status(200).json({
                msg: 'Paciente cadastrado com sucesso.'
            })
        } catch (err){
            console.log(err)
            res.status(500).json({
                msg: 'Error ao cadastra o paciente.'
            })
        }
    } 

    async index(req, res) {
        try {
            const patients = await User.findById({
                _id: req.userId
            }).populate('patients')

            res.json({
                data: patients,
                message: 'Sucess'
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'there was an error on server side!'
            })
        }
    }
}

export default new PatientsController();