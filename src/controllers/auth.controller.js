
import { createAccessToken } from '../libs/jwt.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const register = async(req, res)=>{
    const {email, password, username} = req.body

    try {

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username, email, password : passwordHash,
        })
        //codigo para guardar el usuario en la base de datos
        const userSaved = await newUser.save();
        //utilizamos el token
        const token = await createAccessToken({id:userSaved._id})
        //enviamos el id para que lo cree como un token
        //crea una cookie que ya viene de express, para que se cree directamente la cookie en nuestro navegador
        res.cookie("token", token)
    
        //respuesta al cliente
        res.json({
            email:userSaved.email,
            username: userSaved.username,
            id: userSaved.id
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

export const login = (req, res)=>{
    res.json("welcome login")
}