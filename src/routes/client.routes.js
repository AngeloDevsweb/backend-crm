import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {getClient, createClient, getClientOne, deleteClient, updteClient} from '../controllers/client.controller.js'
// import { validateSchema } from '../middlewares/validator.middleware.js'
// import { clientSchema } from '../schemas/client.schema.js'


const router = Router()

router.get('/api/client', authRequired, getClient)
router.post('/api/client', authRequired, createClient)

router.get('/api/client/:id', authRequired, getClientOne)
router.delete('/api/client/:id', authRequired, deleteClient)
router.put('/api/client/:id', authRequired, updteClient)

export default router