import { Router } from 'express'
import { createUser } from '../controllers/userController.js'
// import { auth } from "../middleware/auth.js";
export const createUserRouter = Router()

// createUserRouter.post("/", auth, createUser);
createUserRouter.post('/', createUser)
