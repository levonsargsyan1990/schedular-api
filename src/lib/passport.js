import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import env from '../config/env';

// import models
import User from '../models/user.model';
import Organization from '../models/organization.model';

export const init = () => {
  passport.use(
    'userLogin',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email }).select('+password').exec();
          console.log('User found', user);
          if (!user) {
            return done(null, null, { message: 'User not found' });
          }
          const isMatch = await user.comparePassword(password);
          if (!isMatch) {
            return done(null, null, { message: 'Incorrect password' });
          }
          return done(null, user);
        } catch (err) {
          done(err);
        }
      },
    ),
  );

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
    'organization-jwt',
    new JwtStrategy(jwtOptions, async (payload, done) => {
      console.log('Organization authentication check');
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

  passport.use(
    'user-jwt',
    new JwtStrategy(jwtOptions, async (payload, done) => {
      console.log('User authentication check');
      const { userId } = payload;
      const user = await User.findOne({
        _id: userId,
      }).exec();
      if (user) {
        console.log(`User found: ${user._id}`);
        done(null, user);
      } else {
        console.log('User not found');
        done(null, null);
      }
    }),
  );
};
