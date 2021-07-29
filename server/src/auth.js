import bcrypt from 'bcrypt'

import { createAccessToken, createRefreshToken, verifyAccessToken } from './access'
import { sendRefreshToken } from './send-refresh-token'

export const tryLogin = async (nome, password, models, res) => {
  const error = { path: 'Login', message: 'Nome de usuário ou senha incorretos!' }
  const user = await models.Usuario.findOne({ where: { nome }, raw: true })
  if (!user) {
    return {
      ok: false,
      errors: [error]
    }
  }

  const valid = await bcrypt.compare(password, user.senha)
  if (!valid) {
    return {
      ok: false,
      errors: [error]
    }
  }

  sendRefreshToken(res, createRefreshToken(user))

  const accessToken = createAccessToken(user)

  return {
    ok: true,
    token: accessToken
  }
}

export const isAuth = (req, _, next) => {
  //console.log('isAuth req.headers:', req.headers)

  if (req.headers.authorization) {
  const token = req.headers.authorization.split(' ')[1]

    if (token) {
      try {
        const { userId } = verifyAccessToken(token)
        req.user = userId

      } catch (err) {
        if (req.url !== '/refresh') {
          //console.log('isAuth err:', err.message)
          throw new Error('Not authenticated!')
        }
      }
    }
  }
  return next()
}
