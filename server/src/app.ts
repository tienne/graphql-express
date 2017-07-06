import {Connection} from 'typeorm';
import {getConnection} from './models';
import {graphiqlExpress} from 'graphql-server-express';

export default async function startServer (
  {isDev = false, isTest = false}, dbConnection?: Connection
) {
  const connection = dbConnection || await getConnection()
  const app = await getServer(connection, isDev)

  // Adds Enviornment variables from .enviornment
  const env = (isDev && 'development') || (isTest && 'test') || 'production'

  app.use('/graphql',ensureAuthenticated, buildGraphQLRouteHandler());
  app.use('/graphiql',ensureAuthenticated, graphiqlExpress({endpointURL: '/graphql'}))

  return app
}
