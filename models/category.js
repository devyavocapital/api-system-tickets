import mongoose from 'mongoose'
import { urlApi } from '../db/config.js'
import categories from '../schemas/category.js'

export class CategoryModel {
  static async getCategories () {
    try {
      await mongoose.connect(urlApi)
      const categoriesList = await categories.find()
      return categoriesList
    } catch (error) {
      console.log(error)
      return { error: 'Hubo un error' }
    }
  }

  static async createCategory ({ nameCategory, userId }) {
    try {
      await mongoose.connect(urlApi)

      const categoryExist = await categories.findOne({ nameCategory })
      if (categoryExist) {
        return {
          error: 'Error: Ya existe una categoría con este nombre',
          status: 401
        }
      }

      const newCategory = await categories({
        nameCategory,
        userId
      })

      await newCategory.save()

      return { msg: 'Categoría agregada.', status: 201 }
    } catch (error) {
      console.log({ errorMongo: error })
      return { error }
    }
  }

  static async updateCategory ({ id, nameCategory, userId }) {
    try {
      await mongoose.connect(urlApi)

      const categoryExist = await categories.findById(id)
      if (!categoryExist) {
        return {
          error: 'Error: No existe una categoría con este ID',
          status: 401
        }
      }

      await categories.findByIdAndUpdate(id, {
        nameCategory,
        userId
      })

      return { msg: 'Categoría actualizada correctamente.', status: 200 }
    } catch (error) {
      console.log(error)
      return { error }
    }
  }
}
