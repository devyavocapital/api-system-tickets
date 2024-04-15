import { CategoryModel } from '../models/category.js'

export const createCategory = async (req, res) => {
  const { nameCategory } = req.body
  const userId = req.usuario.id

  try {
    const response = await CategoryModel.createCategory({
      nameCategory,
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

export const getCategories = async (req, res) => {
  try {
    const response = await CategoryModel.getCategories()
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
}

export const updateCategory = async (req, res) => {
  const { nameCategory } = req.body
  const { id } = req.query
  const userId = req.usuario.id

  try {
    const response = await CategoryModel.updateCategory({
      id,
      nameCategory,
      userId
    })
    return res.status(response.status).json(response)
  } catch (error) {
    console.log(error)
  }
}
