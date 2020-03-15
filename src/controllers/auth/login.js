import passport from 'passport';
import jwt from 'jsonwebtoken';

import env from '../../config/env';

export const login = (req, res, next) => {
  passport.authenticate('login', async (err, organization, info) => {
    if (err) {
      console.log(err);
    }
    if (info) {
      res.send(info.message);
    } else {
      const token = jwt.sign({ organizationId: organization._id }, env.jwt.secret);
      res.status(200).send({
        token,
      });
    }
  })(req, res, next);
};
