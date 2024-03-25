
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

export const login = async(req, res)=>{
    const {email, password} = req.body;

    try {
         //guardamos en la variable el usuario o email que encontramos en la base de datos
         const userFound = await User.findOne({email})
         //hacemos una validacion 
         if(!userFound) return res.status(400).json(["user not found"])

         //logica para verificar el password del usuario con el password de la base de datos del email que encontramos
         const isMatch = await bcrypt.compare(password, userFound.password)
         //hacemos una validacion
         if(!isMatch) return res.status(400).json(["Incorrect password"])

         //utilizar el token
         const token = await createAccessToken({id: userFound._id}) //enviamos el id para que lo cree como un token
         //crea una cookie que ya viene de express, para que se cree directamente la cookie en nuestro navegador
         res.cookie("token", token)

         //respuesta al cliente
         res.json({
            email:userFound.email,
            username: userFound.username,
            id: userFound.id,
            createdAt : userFound.createdAt
         })
 

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const logout = (req, res) =>{
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200)
}