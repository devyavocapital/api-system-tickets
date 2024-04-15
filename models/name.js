import mongoose from 'mongoose'
import { urlApi } from '../db/config.js'
import user from '../schemas/user.js'

export class NameModel {
  static async getNames () {
    try {
      await mongoose.connect(urlApi)

      const names = await user.find().select(['_id', 'name', 'lastname'])
      console.log(names)
      return names
    } catch (error) {
      console.log(error)
      return { error: 'Hubo un error', errorStack: error }
    }
  }
}
