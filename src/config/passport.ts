import { PassportStatic } from 'passport'
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt'

import { getUserById } from '../models/user'
import config from './config'

export default function passportMiddleware (passport: PassportStatic) {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.secret
  }

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    getUserById(jwtPayload, (err, user) => {
      if (err) return done(err, false)

      return user
        ? done(null, user)
        : done(null, false)
    })
  }))
}
