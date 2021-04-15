/**
 * Ponto de partida da aplicação servidora
 * @author Josafá Santos dos Reis
 */

import jwt from 'jsonwebtoken'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

import models from './models'
import db from './models/index'
import { refreshTokens } from './auth'

/***** trocar por chaves de verdade *****/
const SECRET = 'kwvowudvj33739fnq9cn9938'
const SECRET2 = 'kwvowudvj33739fnq9cn9938sjg9w73'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

const app = express()
const url = '/graphql'

const getUser = async (req, res, next) => {
  const token = req.headers['x-token']
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET)
      req.user = user
    } catch (err) {
      const reloadToken = req.headers['x-reload-token']
      const newTokens = await refreshTokens(token, reloadToken, models, SECRET, SECRET2)
      if (newTokens && newTokens.reloadToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-reload-token')
        res.set('x-token', newTokens.token)
        res.set('x-reload-token', newTokens.reloadToken)
      }
      req.user = newTokens.user
    }
  }
  next()
}

/* const requestHandler = (req, res, next) => {
  if (req.method === 'POST' && req.url === '/graphql') {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      message: 'Os argumentos não podem estar vazios'
    }))
    return
  }
  next()
} */
//app.use(getUser, requestHandler)

app.use(getUser)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      models,
      sequelize: db.sequelize,
      SECRET,
      SECRET2,
      user: req.user
    }
  }
})

server.applyMiddleware({ app, path: url, cors: true })

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${url}`))
