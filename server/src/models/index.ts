import 'reflect-metadata';
import User from './user';
import { createConnection, Connection, ConnectionOptions} from 'typeorm';
import {yellow, red} from 'chalk';

export let connection: Connection;

export async function getConnection (options: object = null, enableLogging: boolean = true) {

  //커넥션이 없는경우 커넥션 생성
  if (!connection || !connection.isConnected) {
    const defaultOtpion = {
      type: 'mysql',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: 'admin',
      entities: [
        User
      ],
      autoSchemaSync: true
    };

    options = options || defaultOtpion;
    connection = await createConnection(options as any);
  }
  return connection;
}