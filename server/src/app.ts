import {Connection} from 'typeorm';
import getServer from './server';
import buildGraphQLRouteHandler from './graphql';
import {getConnection} from './models';
import {graphiqlExpress} from 'graphql-server-express';
import {ensureAuthenticated} from './auth';

/**
 * 서버 실행 옵션
 */
export interface serverOption {
  isDev : boolean;
  isTest : boolean;
}

export default async function startServer(option: serverOption = {isDev: false, isTest: false}, dbConnection?: Connection) {
  const connection = dbConnection || await getConnection();
  const app = await getServer(connection, option.isDev);

  // Adds Enviornment variables from .enviornment
  const env = (option.isDev && 'development') || (option.isTest && 'test') || 'production';

  app.use('/graphql', ensureAuthenticated, buildGraphQLRouteHandler());
  app.use('/graphiql', ensureAuthenticated, graphiqlExpress({endpointURL: '/graphql'}));

  return app;
}
