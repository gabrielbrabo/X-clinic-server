import Patients from '../models/Patients'
import User from '../models/User'

class PatientsController {

    async create(req, res) {
        const {
            name, 
            email, 
            brithData, 
            sexo, 
            cpf, 
            rg,
            cell,
            address,
            number,
            district,

        } = req.body

        if (!name) {
            return res.status(421).json({ msg: "O nome é obrigatório!" });
        }

        if (email) {
            if(email.search("@")==-1) {
                return res.status(421).json({ msg: "Email invalido!" });
            }
        }

        if (!cell) {
            return res.status(421).json({ msg: "O numero de celular é obrigatório!" });
        }

        if (isNaN(cell)) {
            return res.status(421).json({ msg: "O numero de celular so pode conter numeros!" });
        }

        if (!brithData) {
            return res.status(421).json({ msg: "A data de nascimento é obrigatório!" });
        }

        if (!cpf) {
            return res.status(421).json({ msg: "O CPF é obrigatório!" });
        }
        if (cpf.length != 11) {
            return res.status(421).json({ msg: "O CPF é invalido!" });
        }

        if (isNaN(cpf)) {
            return res.status(421).json({ msg: "O CPF so pode conter numeros!" });
        }

        if (!rg) {
            return res.status(421).json({ msg: "O RG é obrigatório!" });
        }

        if (isNaN(rg)) {
            return res.status(421).json({ msg: "O RG so pode conter numeros!" });
        }

        if (!address) {
            return res.status(421).json({ msg: "O endereço é obrigatório!" });
        }

        if (!number) {
            return res.status(421).json({ msg: "O numero é obrigatório!" });
        }

        if (isNaN(number)) {
            return res.status(421).json({ msg: "O numero so pode conter numeros!" });
        }

        const patient = await Patients.findOne({email: email})
         
        if(patient) {
            return res.status(404).json({ msg: "Este email ja esta cadastrado em outro paciente!" })
        } 

        const cpfPatient = await Patients.findOne({cpf: cpf})

        if(cpfPatient) {
            return res.status(404).json({ msg: "Este CPF ja esta cadastrado em outro paciente!" })
        }

        const rgPatient = await Patients.findOne({rg: rg})

        if(rgPatient) {
            return res.status(404).json({ msg: "Este RG ja esta cadastrado em outro paciente!" })
        }

        const newPatient = new Patients({
            name,
            email,
            IDclinic: req.userId,
            brithData, 
            sexo,
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