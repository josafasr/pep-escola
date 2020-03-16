import jwt from 'jsonwebtoken'
import _ from 'lodash'
import bcrypt from 'bcrypt'

export const createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ['id'])
    },
    secret,
    {
      expiresIn: '60m'
    }
  )

  const createReloadToken = jwt.sign(
    {
      user: _.pick(user, 'id')
    },
    secret2,
    {
      expiresIn: '7d'
    }
  )
  return [createToken, createReloadToken]
}

export const refreshTokens = async (token, reloadToken, models, SECRET, SECRET2) => {
  let userId = 0
  try {
    const { user: { id } } = jwt.decode(reloadToken)
    userId = id
  } catch (err) {
    return {}
  }

  if (!userId) {
    return {}
  }

  const user = await models.Usuario.findOne({ where: { id: userId }, raw: true})
  if (!user) {
    return {}
  }

  const reloadSecret = user.password + SECRET2
  try {
    jwt.verify(reloadToken, reloadSecret)
  } catch (err) {
    return {}
  }

  const [newToken, newReloadToken] = await createTokens(user, SECRET, reloadSecret)
  return {
    token: newToken,
    reloadToken: newReloadToken,
    user
  }
}

export const tryLogin = async (nome, password, models, SECRET, SECRET2) => {
  const user = await models.Usuario.findOne({ where: { nome }, raw: true })
  if (!user) {
    return {
      ok: false,
      errors: [{ path: 'name', message: 'Wrong user name!' }]
    }
  }

  const valid = await bcrypt.compare(password, user.senha)
  if (!valid) {
    return {
      ok: false,
      errors: [{ path: 'password', message: 'Wrong password!' }]
    }
  }

  const reloadTokenSecret = user.senha + SECRET2

  const [token, reloadToken] = await createTokens(user, SECRET, reloadTokenSecret)

  return {
    ok: true,
    token,
    reloadToken
  }
}
