import mongoose from 'mongoose'

const contratSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    fechaInicio:{
        type: Date,
        default: Date.now
    },
    fechaFin:{
        type: Date,
        default: Date.now
    },
    monto:String,
    estado:String,
    opcion:String,
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

export default mongoose.model('Contrat', contratSchema)