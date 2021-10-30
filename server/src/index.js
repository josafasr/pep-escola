/**
 * Ponto de partida da aplicação servidora
 * @author Josafá Santos dos Reis
 */

import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { PubSub } from 'graphql-subscriptions'

import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import cookieParser from 'cookie-parser'

import models from './models'
import db from './models/index'
import { isAuth } from './auth'
import { sendRefreshToken } from './send-refresh-token'
import { createAccessToken, createRefreshToken, verifyRefreshToken } from './access'

// eslint-disable-next-line no-unexpected-multiline
(async function() {
  try {
    const app = express()

    app.use(cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
      //allowedHeaders: []
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

    const httpServer = createServer(app)
    const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')))
    const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))
    const schema = makeExecutableSchema({ typeDefs, resolvers })

    const pubsub = new PubSub()

    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => {
        return {
          models,
          sequelize: db.sequelize,
          req,
          res,
          pubsub
        }
      },
      plugins: [{
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            }
          }
        }
      }]
    })

    //await server.start()

    const subscriptionServer = SubscriptionServer.create(
      {
        schema,
        execute,
        subscribe,
        async onConnect() {
          return { pubsub }
        }
      }, {
        server: httpServer,
        path: server.graphqlPath
      }
    )

    server.applyMiddleware({ app, path: url, cors: false })

    httpServer.listen({ port: 4000 }, () => console.log(`🚀 Server ready at ${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}${url}`))
  } catch(error) {
    console.log('error:', error.message)
  }
})()