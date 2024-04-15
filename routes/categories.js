import { Router } from 'express'
import {
  createCategory,
  getCategories,
  updateCategory
} from '../controllers/categoriesController.js'
import { auth } from '../middleware/auth.js'
export const categoryRouter = Router()

categoryRouter.get('/', auth, getCategories)
categoryRouter.post('/', auth, createCategory)
categoryRouter.put('/', auth, updateCategory)
