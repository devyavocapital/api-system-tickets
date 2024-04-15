import { Router } from 'express'
import { getStats } from '../controllers/statsController.js'
import { auth } from '../middleware/auth.js'

export const statsRouter = Router()

statsRouter.get('/', auth, getStats)
