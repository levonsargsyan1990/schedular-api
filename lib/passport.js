import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

export const init = () => {
  const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  };

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    console.log('Yay');
    try {
      console.log('jwtPayload', jwtPayload);
      const { sub } = jwtPayload;
      const organization = Organizations.findOne({ id: sub }).exec();
      if (organization) {
        return done(null, organization);
      }
    } catch (err) {
      return done(err, false);
    }
    return done(null, false);
  }));
};
