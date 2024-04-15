export const tokenApi = (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(500).json({ error: 'Error: Sin autorización' })
  }

  if (token !== process.env.TOKEN_API_AUTHORIZATION) {
    return res
      .status(500)
      .json({ error: 'Error: Token erronéo, favor de validar.' })
  }
  next()
}
