import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// import models
import Organization from '../models/organization';

export const init = () => {
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'apiKey',
        passwordField: 'apiSecret',
        session: false,
      },
      async (apiKey, apiSecret, done) => {
        try {
          const organization = await Organization.findOne({ apiKey, apiSecret }).exec();
          if (!organization) {
            return done(null, null, { message: 'Bad credentials' });
          }
          return done(null, organization);
        } catch (err) {
          done(err);
        }
      },
    ),
  );

  const { JWT_SECRET } = process.env;

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  };

  passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (payload, done) => {
      console.log('Authentication check');
      try {
        const { organizationId } = payload;
        const organization = await Organization.findOne({
          _id: organizationId,
        }).exec();
        if (organization) {
          console.log('Organization found in db in passport');
          done(null, organization);
        } else {
          done(null, null);
        }
      } catch (err) {
        done(err);
      }
    }),
  );
};