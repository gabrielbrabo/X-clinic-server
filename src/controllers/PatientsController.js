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
}

export default new PatientsController();