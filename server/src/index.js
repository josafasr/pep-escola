/**
 * Ponto de partida da aplicação servidora
 * @author Josafá Santos dos Reis
 */

import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'

import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import cookieParser from 'cookie-parser'

import models from './models'
import db from './models/index'
import { isAuth } from './auth'
import { sendRefreshToken } from './send-refresh-token'
import { createAccessToken, createRefreshToken, verifyRefreshToken } from './access'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

const app = express()

app.use(cors({
  origin: 'http://localhost:80',
  credentials: true,
  allowedHeaders: []
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const url = '/graphql'

app.use(isAuth)

/* app.use((req, _, next) => {

  if ((['/refresh'].includes(req.url))
      || (['GET', 'OPTIONS'].includes(req.method))
      || (['TryLogin', 'IntrospectionQuery'].includes(req.body.operationName))
      || req.user) {
    return next()
  } else {
    throw new Error('Not authorized!')
  }
}) */

app.post('/refresh', async (req, res) => {
  
  const refreshToken = req.cookies.jid
  if (!refreshToken) {
    return res.send({ ok: false, accessToken: '' })
  }

  let payload = null
  try {
    payload = verifyRefreshToken(refreshToken)
  } catch (error) {
    return res.send({ ok: false, accessToken: '' })
  }

  const user = await models.Usuario.findOne({ where: { id: payload.userId }, raw: true})
  if (!user) {
    return res.send({ ok: false, accessToken: '' })
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: '' })
  }

  sendRefreshToken(res, createRefreshToken(user))

  return res.send({ ok: true, accessToken: createAccessToken(user) })
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      models,
      sequelize: db.sequelize,
      req,
      res
    }
  }
})

server.applyMiddleware({ app, path: url, cors: false })

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at ${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}${url}`))
