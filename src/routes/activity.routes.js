import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js';
import { getActivity, createActivity, getOneActivity, deleteActivity, updateActivity } from '../controllers/activity.controller.js';

const router = Router()

//rutas para activity
router.get('/api/activity', authRequired, getActivity)
router.post('/api/activity', authRequired, createActivity)

router.get('/api/activity/:id', authRequired, getOneActivity)
router.delete('/api/activity/:id', authRequired, deleteActivity)
router.put('/api/activity/:id', authRequired, updateActivity)

export default router;