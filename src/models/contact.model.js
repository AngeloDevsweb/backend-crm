import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    nombre: {
        type: String,
        trim:true
    },
    descripcion:{
        type: String,
        trim:true
    },
    cargo: {
        type:String,
        trim:true
    },
    relacionComercial: {
        type: String,
        trim:true
    },
    telefono: String,
    correo: String,
    Nota: String,
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})
export default mongoose.model('Contact', contactSchema)