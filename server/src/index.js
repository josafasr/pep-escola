import * as jwt from 'jsonwebtoken'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

import models from './models'
// import typeDefs from './schema'
// import resolvers from './resolvers'

// const models = fileLoader(path.join(__dirname, './models'))

const SECRET = 'kwvowudvj33739fnq9cn9938'
const SECRET2 = 'kwvowudvj33739fnq9cn9938sjg9w73'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

const app = express()
const url = '/api'

// const getUser = (token, secret) => {
//   console.log(jwt.verify(token, secret))
// }

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    
    // Get the user token from the headers
    // const token = req.headers.authorization || ''
    
    // try to retrieve a user with the token
    // const { user } = getUser(token, SECRET)
    
    // add the user to the context
    return {
      models,
      SECRET,
      SECRET2,
      // user
    }
  }
})

server.applyMiddleware({ app, path: url, cors: true })

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${url}`))
