import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { graphiqlExpress } from 'graphql-server-express';

const PORT = 3000;

express()
  .use('/graphql', bodyParser.json())
  .use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
  .listen(PORT);