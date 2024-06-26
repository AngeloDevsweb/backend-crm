import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js';
import { createContrat, deleteContrat, getContrats, getOneContrat, updateContrat } from '../controllers/contrat.controller.js';

const router = Router()

//rutas para contratoss
router.get('/api/contrats', authRequired, getContrats)
router.post('/api/contrats', authRequired, createContrat)

//rutas con id
router.get('/api/contrats/:id', authRequired, getOneContrat)
router.delete('/api/contrats/:id', authRequired, deleteContrat)
router.put('/api/contrats/:id', authRequired, updateContrat)

export default router;