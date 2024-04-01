import mongoose from 'mongoose'


const activitySchema = new mongoose.Schema({
    tipoActividad :{
        type: String,
        trim: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    nota:{
        type: String,
    },
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

export default mongoose.model('Activity', activitySchema)