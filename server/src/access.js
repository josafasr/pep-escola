import jwt from 'jsonwebtoken'

export const createAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: '5s',
      algorithm: 'RS512'
    }
  )
}

export const createRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_KEY,
    {
      expiresIn: '10s',
      algorithm: 'RS512'
    }
  )
}

export const verifyAccessToken = (token) => {
  return jwt.verify(
    token,
    process.env.ACCESS_TOKEN_KEY,
    { algorithms: ['RS512'] },
    (err, payload) => {
      if (!err) {
        return payload
      } else {
        throw new Error(err.message)
      }
    }
  )
}

export const verifyRefreshToken = (token) => {
  return jwt.verify(
    token,
    process.env.REFRESH_TOKEN_KEY,
    { algorithms: ['RS512'] },
    (err, payload) => {
      if (!err) {
        return payload
      } else {
        throw new Error(err.message)
      }
    }
  )
}

//JSF+CGR