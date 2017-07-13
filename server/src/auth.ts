import * as passport from 'passport';
import { Express, Response, Request } from 'express';
import { getConnection } from './models';
import User from './models/user';
import { Connection } from 'typeorm';

export default async function setupPassport(server: Express, connection: Connection) {
  const userRepo = connection.getRepository(User);

  passport.serializeUser((user: User, done: Function) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    const user = await userRepo.findOneById(id);

    if (user) {
      done(null, user);
    } else {
      done(null, {});
    }
  });

  server.use(passport.initialize());
  server.use(passport.session());
  server.get('/login-failure', loginFailure);

  function loginFailure(req: Request, response: Response) {
    response.statusCode = 403;
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({
      errors: [
        { message: 'Login failure' }
      ]
    }));
    response.end();
  }

  return server;
}

export function ensureAuthenticated(req: Request, res: Response, next: Function) {
  console.log(req.user);
  if (req.isAuthenticated()) {
    return next();
  }

  res.sendStatus(403);
}
