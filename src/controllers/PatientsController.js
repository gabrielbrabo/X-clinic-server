import Patients from '../models/Patients'
import User from '../models/User'

class PatientsController {

    async create(req, res) {
        const {
            name, 
            email, 
            brithData, 
            sexo, 
            diagnosis, 
            cpf, 
            rg,
            cell,
            address,
            number,
            district,

        } = req.body

        const newPatient = new Patients({
            name,
            email,
            IDclinic: req.userId,
            brithData, 
            sexo, 
            diagnosis, 
            cpf, 
            rg,
            cell,
            address,
            number,
            district,
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

            if (patients) {
                return res.json({
                    data: patients,
                    message: 'Sucess'
                })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'there was an error on server side!'
            })
        }
    }
}

export default new PatientsController();