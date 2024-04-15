import { UserModel } from '../models/user.js'

export const createUser = async (req, res) => {
  const { email, password, category, name, lastname, motherLastname } =
		req.body
  try {
    const response = await UserModel.createUser({
      email,
      password,
      category,
      name,
      lastname,
      motherLastname
    })

    if (response?.error) {
      if (response.error?.errors) {
        return res.status(400).json(response.error.errors)
      }
      return res.status(400).json(response)
    }

    return res.status(response?.status).json(response)
  } catch (error) {
    return res.status(400).json(error)
  }
}
