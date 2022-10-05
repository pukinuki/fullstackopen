const config = require('./utils/config')
const logger = require('./utils/logger')
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const _ = require('lodash')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const http = require('http')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const express = require('express')
const { execute, subscribe } = require('graphql')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

/*
 * Connect to MongoDB Database
 */
logger.info('connecting to', config.MONGODB_URI)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  httpServer.listen(config.PORT, () =>
    console.log(`Server is now running on http://localhost:${config.PORT}`)
  )
}

// call the function that does the setup and starts the server
start()
