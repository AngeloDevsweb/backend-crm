import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js';
import { createContact, getContacts } from '../controllers/contact.controller.js';

const router = Router()

//rutas
router.get('/api/contact', authRequired, getContacts)
router.post('/api/contact', authRequired, createContact)

export default router;