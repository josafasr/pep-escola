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
      expiresIn: '1m'
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
