import Client from "../models/client.model.js";

export const getClient = async (req, res) => {
  const clients = await Client.find({
    user: req.user.id,
  }).populate('user');
  res.json(clients);
};

export const getClientOne = async (req, res) =>{
    const client = await Client.findById(req.params.id);
    if(!client) return res.status(404).json({message:"client not found"})

    res.json(client)
}

export const createClient = async (req, res) => {
  const { nombre, descripcion, direccion, web, industria, estado, telefono } =
    req.body;

  const newClient = new Client({
    nombre,
    descripcion,
    direccion,
    web,
    industria,
    estado,
    telefono,
    user: req.user.id,
  });
  const savedClient = await newClient.save()
  res.json(savedClient)
};

export const deleteClient = async(req, res) =>{
    const client = await Client.findByIdAndDelete(req.params.id)
    if(!client) return res.status(404).json({message: "client not found"})

    return res.sendStatus(204);
}

export const updteClient = async(req, res)=>{
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {new:true})
    if(!client) return res.status(404).json({message:"client not found"})

    res.json(client)
}