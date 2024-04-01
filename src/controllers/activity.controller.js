import Activity from '../models/activity.model.js'
import Client from '../models/client.model.js'

export const getActivity =async(req, res)=>{
    try {
        const activity = await Activity.find({user:req.user.id}).populate('client')
        res.json(activity)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'server internal error'})
    }

}
export const getOneActivity = async(req, res)=>{
    const activity = await Activity.findById(req.params.id).populate('client')
    if(!activity) return res.status(404).json({message:'activity not found'})

    res.json(activity)
}

export const createActivity = async (req, res) =>{
    const {tipoActividad, fecha, nota, clientId} = req.body
    try {
        //verificar si el cliente existe
        const existingClient = await Client.findById(clientId)
        if(!existingClient) return res.status(404).json({message:'client not found'})

        //crear la actividad
        const newActivity = new Activity({
            tipoActividad,
            fecha,
            nota,
            client: existingClient._id, // Asignar el ID del cliente
            user: req.user.id
        })

        const resActivity = await newActivity.save()
        res.json(resActivity)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteActivity = async (req, res)=>{
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id)
    if(!deletedActivity) return res.status(404).json({message:'activity not eliminated'})

    return res.sendStatus(204)
}

export const updateActivity = async (req, res)=>{
    const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, {new:true})
    if(!updatedActivity) return res.status(404).json({message:'server error'})

    res.json(updatedActivity)
}