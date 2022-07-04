import User from "../models/User";
import bcrypt from 'bcryptjs'

class UsersController {

    async index(req, res) {
        try {
          const users = await User.find();
    
          return res.json(users);
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
    }
  
    async create(req, res) {
        const { name, email, password, confirmpassword } = req.body;

        // validations
        if (!name) {
            return res.status(422).json({ msg: "O nome é obrigatório!" });
        }

        if (!email) {
            return res.status(422).json({ msg: "O email é obrigatório!" });
        }

        if (!password) {
            return res.status(422).json({ msg: "A senha é obrigatória!" });
        }

        if (password != confirmpassword) {
            return res
            .status(422)
            .json({ msg: "A senha e a confirmação precisam ser iguais!" });
        }

        // check if user exists
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
        }

        // create password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // create user
        const user = new User({
            name,
            email,
            password: passwordHash
        });

        try {
            await user.save();

            res.status(201).json({ msg: "Usuário criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: error });
        }
    }
  
    async update(req, res) {
        try {
            const { id } = req.params;
            const { email, password } = req.body;
            const user = await User.findById(id);
  
            if (!user) {
            return res.status(404).json();
            }

            const encryptedPassword = await createPasswordHash(password)
  
            await user.updateOne({email, password: encryptedPassword });
    
            return res.status(200).json();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
  
    async destroy(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
    
            if (!user) {
                return res.status(404).json();
            }
    
            await user.deleteOne();
    
            return res.status(200).json();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
  
export default new UsersController();