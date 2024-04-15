import jwt from 'jsonwebtoken'
import { Login } from '../models/login.js'

export const authUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const payload = await Login.getLogin({ email, password })

    if (payload?.error) {
      return res.json(payload)
    }

    jwt.sign(
      payload,
      process.env.SECRETTRACKSWORDS,
      {
        expiresIn: '30D'
      },
      (error, token) => {
        if (error) throw error
        return res.json({ token })
      }
    )
  } catch (error) {
    console.log(error)
  }
}

export const userAuthenticate = async (req, res) => {
  const id = req.usuario.id
  try {
    const response = await Login.getUserAuthenticated({ id })
    return res.json({ user: response })
  } catch (error) {
    console.log(error)
  }
}
