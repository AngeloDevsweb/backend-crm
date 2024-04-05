import Client from '../models/client.model.js'
import Contrat from '../models/contrats.model.js'

export const getContrats = async(req, res)=>{
    try {
        const contrats = await Contrat.find({user: req.user.id}).populate('client')
        res.json(contrats)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'server error'}) 
    }
}

export const getOneContrat = async(req, res)=>{
    const contrat = await Contrat.findById(req.params.id).populate('client')
    if(!contrat) return res.status(404).json({message:'contrat not found'})

    res.json(contrat)
}

export const createContrat = async (req, res) => {
  const { titulo,descripcion, fechaInicio, fechaFin, monto, estado, opcion, clientId } =
    req.body;

  try {
    const existingClient = await Client.findById(clientId);
    if (!existingClient)
      return res.status(404).json({ message: "client not found" });

    //crear el contrato
    const newContrat = new Contrat({
      titulo,
      descripcion,
      fechaInicio,
      fechaFin,
      monto,
      estado,
      opcion,
      client: existingClient._id, // Asignar el ID del cliente
      user: req.user.id,
    });
    const savedContrat = await newContrat.save();
    res.json(savedContrat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteContrat = async(req, res)=>{
    const deletedContrat = await Contrat.findByIdAndDelete(req.params.id)
    if(!deletedContrat) return res.status(404).json({message:'contrat not eliminated'})

    res.sendStatus(204)
}

export const updateContrat = async(req, res)=>{
    const updatedContrat = await Contrat.findByIdAndUpdate(req.params.id, req.body, {new:true})
    if(!updatedContrat) return res.status(404).json({message:'server error'})

    res.json(updatedContrat)
}
