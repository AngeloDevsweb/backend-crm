import Contact from '../models/contact.model.js'
import Client from '../models/client.model.js';


export const getContacts = async(req, res)=>{
    try {
        const contacts = await Contact.find({ user: req.user.id })
            .populate('user') // Primera población para el usuario
            .populate('client'); // Segunda población para el cliente
        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createContact = async(req, res) =>{
    const {nombre, descripcion, cargo, relacionComercial, telefono, correo, Nota, clientId} =  req.body

    try {
         // Verificar si el cliente existe
         const existingClient = await Client.findById(clientId);

         if (!existingClient) {
             return res.status(400).json({ message: "Client not found" });
         }
 
         // Crear el contacto
         const newContact = new Contact({
             nombre,
             descripcion,
             cargo,
             relacionComercial,
             telefono,
             correo,
             Nota,
             client: existingClient._id, // Asignar el ID del cliente
             user: req.user.id,
         });
 
         // Guardar el contacto
         const savedContact = await newContact.save();
 
         res.json(savedContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

}