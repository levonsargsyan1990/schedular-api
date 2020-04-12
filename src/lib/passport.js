import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import env from '../config/env';

// import models
import Organization from '../models/organization.model';

export const init = () => {
  passport.use(
    'organizationLogin',
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

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.auth.jwt.secret,
  };

  passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (payload, done) => {
      console.log('Authentication check');
      const { organizationId } = payload;
      const organization = await Organization.findOne({
        _id: organizationId,
      }).exec();
      if (organization) {
        console.log(`Organization found: ${organization.name} (${organization._id})`);
        done(null, organization);
      } else {
        console.log('Organization not found');
        done(null, null);
      }
    }),
  );
};
