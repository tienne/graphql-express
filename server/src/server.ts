import * as express from 'express';
import * as session from 'express-session';
// import * as flash from 'connect-flash';
import * as uuid from 'node-uuid';
import * as bodyParser from 'body-parser';
import * as connectRedis from 'connect-redis';
import {Connection} from 'typeorm';
import * as cors from 'cors';

const RedisStore = connectRedis(session);

export default async function getServer(connection: Connection, isDev = false) {
    let server = express();

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
        store: new RedisStore({
            host: '127.0.0.1',
            port: 6379
        })
    })).use(bodyParser.urlencoded({
        extends: true
    })).use(bodyParser.json());


    // server = await setupPass
    return server;
}
