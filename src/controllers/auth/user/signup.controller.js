import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';

import User from '../../../models/user.model';
import { Success, APIError } from '../../../utils';
import env from '../../../config/env';

/**
 * Signing up
 *
 * @param {Object} req - Request object
 * @param {Object} req.body - Body of request
 * @param {String} req.body.firstName - First name of user
 * @param {String} req.body.lastName - Last name of user
 * @param {String} req.body.email - Email of user
 * @param {String} req.body.password - Password of user
 */
export const signup = async (req, res, next) => {
  try {
    const { body } = req;
    console.log(`Signup attempt with email ${body.email}`);
    const existingUser = await User.findOne({ email: body.email }).exec();
    if (existingUser) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: 'User with that email already exists',
      });
    }
    const user = new User(body);
    await user.save();
    console.log(`User created ${user._id}`);
    const userObject = user.toObject();
    delete userObject.password;
    const token = jwt.sign({ userId: user._id }, env.auth.jwt.secret);
    console.log(`Logged in as ${user.firstName} ${user.lastName}`);
    return new Success({ data: { user: userObject, token }, res }).send();
  } catch (err) {
    next(err);
  }
};
