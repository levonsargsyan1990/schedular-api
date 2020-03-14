import passport from 'passport';

export const login = (req, res, next) => {
  console.log('Login');
  passport.authenticate('local', { session: false }, (err, organization, info) => {
    console.log({ err, organization, info });
  });
};
