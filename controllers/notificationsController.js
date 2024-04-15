import { NotificationnModel } from '../models/notification.js'

export const createNotification = async (req, res) => {
  const { task, nameClient, assignTo } = req.body
  const userId = req.usuario.id
  try {
    const response = await NotificationnModel.createNotification({
      task,
      nameClient,
      userId,
      assignTo
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

export const updateDataNotification = async (req, res) => {
  const { assignTo, nameClient } = req.body
  const { id } = req.query
  const userId = req.usuario.id

  try {
    const response = await NotificationnModel.updateDataNotification({
      id,
      assignTo,
      nameClient,
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

export const getNotifications = async (req, res) => {
  const userId = req.usuario.id

  try {
    const response = await NotificationnModel.getNotifications({
      userId
    })
    return res.json(response)
  } catch (error) {
    console.log(error)
  }
}

export const patchNotification = async (req, res) => {
  const { readed, active, id } = req.body

  try {
    const response = await NotificationnModel.updateNotification({
      id,
      readed,
      active
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
