import * as express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import * as flash from 'connect-flash';


import * as bodyParser from 'body-parser';
import { graphiqlExpress } from 'graphql-server-express';

const PORT = 3000;

express()
  .use('/graphql', bodyParser.json())
  .use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
  .listen(PORT);
