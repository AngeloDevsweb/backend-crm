import { createAccessToken } from '../libs/jwt.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

export const register = async(req, res)=>{
    const {email, password, username} = req.body

    try {
        const userFound = await User.findOne({email})
        if(userFound)
            return res.status(400).json(["el email ya esta en uso"])

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
        res.status(500).json([error.message])
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

export const profile = async(req, res)=>{
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json(["user not found"]);

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
    })
}

export const verifyToken = async(req, res) =>{
    const {token} = req.cookies;

    console.log("token recibido", token);

    if(!token) return res.status(401).json(['no autorizado'])

    jwt.verify(token, TOKEN_SECRET, async (err, user)=>{
        if (err) return res.status(401).json(['no autorizado'])

        console.log("token decodificado", user);

        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(401).json(['no autorizado'])

        return res.json({
            id:userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })

}