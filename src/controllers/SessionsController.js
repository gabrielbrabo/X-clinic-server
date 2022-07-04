import jwt from 'jsonwebtoken'
import User from '../models/User'
import authConfig from '../config/auth'
import bcrypt from 'bcryptjs'

class SessionController {
    async create(req, res) {
        const { email, password } = req.body;

        // validations
        if (!email) {
            return res.status(422).json({ msg: "O email é obrigatório!" });
        }

        if (!password) {
            return res.status(422).json({ msg: "A senha é obrigatória!" });
        }

        // check if user exists
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }
        
        // check if password match
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(422).json({ msg: "Senha inválida" });
        }
        
        const { id } = user
        return res.json({
            user: {
                id,
                email
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        })
    }
}

export default new SessionController()