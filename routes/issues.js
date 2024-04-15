import { Router } from 'express'
import {
  createIssue,
  getIssues,
  updateIssue,
  updateIssueStatus
} from '../controllers/issuesController.js'
import { auth } from '../middleware/auth.js'
export const issuesRouter = Router()

issuesRouter.get('/', auth, getIssues)
issuesRouter.post('/', auth, createIssue)
issuesRouter.put('/', auth, updateIssue)
issuesRouter.patch('/', auth, updateIssueStatus)
