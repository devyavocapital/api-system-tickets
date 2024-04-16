import { IssuesModel } from '../models/issues.js'

export const createIssue = async (req, res) => {
  const {
    task,
    nameClient,
    lastnameClient,
    motherLastnameClient,
    creditNumber,
    socialNumber,
    cardNumber,
    initialComment,
    assignTo,
    nameAssignated,
    status,
    category,
    daysConfig
  } = req.body

  const userId = req.usuario.id

  try {
    const response = await IssuesModel.createIssue({
      task,
      nameClient,
      lastnameClient,
      motherLastnameClient,
      creditNumber,
      socialNumber,
      cardNumber,
      initialComment,
      assignTo,
      nameAssignated,
      status,
      category,
      daysConfig,
      userId
    })

    if (response?.error) {
      if (response.error?.errors) {
        return res.status(400).json(response.error.errors)
      }
      return res.status(400).json(response)
    }

    return res.json(response)
  } catch (error) {
    console.log(error)
  }
}

export const getIssues = async (req, res) => {
  const { id, task } = req.query
  try {
    const response = await IssuesModel.getIssues({ id, task })
    res.json(response)
  } catch (error) {
    console.log(error)
  }
}

export const updateIssueStatus = async (req, res) => {
  const {
    id,
    status
  } = req.body
  console.log({ id, status })
  try {
    const response = await IssuesModel.updateIssueStatus({
      id,
      status
    })
    console.log(response)
    if (response?.error) {
      if (response.error?.errors) {
        return res.status(400).json(response.error.errors)
      }
      return res.status(400).json(response)
    }

    return res.status(response.status).json(response)
  } catch (error) {
    console.log(error)
  }
}
export const updateIssue = async (req, res) => {
  const {
    task,
    nameClient,
    lastnameClient,
    motherLastnameClient,
    creditNumber,
    socialNumber,
    cardNumber,
    assignTo,
    nameAssignated,
    status,
    category,
    daysConfig
  } = req.body

  const { id } = req.query
  const userId = req.usuario.id

  try {
    const response = await IssuesModel.updateIssue({
      id,
      task,
      nameClient,
      lastnameClient,
      motherLastnameClient,
      creditNumber,
      socialNumber,
      cardNumber,
      assignTo,
      nameAssignated,
      status,
      category,
      daysConfig,
      userId
    })

    if (response?.error) {
      if (response.error?.errors) {
        return res.status(400).json(response.error.errors)
      }
      return res.status(400).json(response)
    }

    return res.status(response.status).json(response)
  } catch (error) {
    console.log(error)
  }
}
