import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js';
import { createContact, deleteContact, getContact, getContacts, updateContact } from '../controllers/contact.controller.js';

const router = Router()

//rutas
router.get('/api/contact', authRequired, getContacts)
router.post('/api/contact', authRequired, createContact)

router.get('/api/contact/:id', authRequired, getContact)
router.delete('/api/contact/:id', authRequired, deleteContact)
router.put('/api/contact/:id', authRequired, updateContact)

export default router;