import * as express from 'express';
import * as session from 'express-session';
// import * as flash from 'connect-flash';
import * as uuid from 'node-uuid';
import * as bodyParser from 'body-parser';
import * as connectRedis from 'connect-redis';
import {Connection} from 'typeorm';
import * as cors from 'cors';

const redisStore = connectRedis(session);

export default async function getServer(connection: Connection, isDev: boolean = false) {
  const server: any = express();

  if (isDev) {
    const corsOptions = {
      origin: (origin: string, cb: Function) => cb(null, true),
      credentials: true
    };
    server.use(cors(corsOptions));
  }

  server.use(session({
    secret: 'asdasdq',
    genid: req => uuid.v4(),
    store: new redisStore({
      host: '127.0.0.1',
      port: 6379
    })
  }));

  server.use(bodyParser.urlencoded({
    extended: true
  }));

  server.use(bodyParser.json());
  // server = await setupPass
  return server;
}
