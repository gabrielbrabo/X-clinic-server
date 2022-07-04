import Patients from '../models/Patients'

class PatientsController {

    async create(req, res) {
        const { name, email } = req.body;

        // validations
        if (!name) {
            return res.status(422).json({ msg: "O nome é obrigatório!" });
        }

        if (!email) {
            return res.status(422).json({ msg: "O email é obrigatório!" });
        }

        // check if user exists
        const userExists = await Patients.findOne({ email: email });

        if (userExists) {
            return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
        }

        // create user
        const patients = Patients({
            name,
            email
        });

        try {
            await patients.save();

            res.status(201).json({ msg: "Usuário criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: error });
        }
    } 
}

export default new PatientsController();