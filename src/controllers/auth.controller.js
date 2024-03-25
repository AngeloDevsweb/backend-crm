import User from '../models/user.model.js'

export const register = async(req, res)=>{
    const {email, password, username} = req.body

    try {
        const newUser = new User({
            username, email, password
        })
        //codigo para guardar el usuario en la base de datos
        const userSaved = await newUser.save();
    
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