import passport from 'passport';
import jwt from 'jsonwebtoken';

export const login = (req, res, next) => {
  const { JWT_SECRET } = process.env;
  passport.authenticate('login', async (err, organization, info) => {
    if (err) {
      console.log(err);
    }
    if (info) {
      res.send(info.message);
    } else {
      const token = jwt.sign({ organizationId: organization._id }, JWT_SECRET);
      res.status(200).send({
        token,
      });
    }
  })(req, res, next);
};
