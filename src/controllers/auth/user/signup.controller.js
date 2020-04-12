import httpStatus from 'http-status';

import User from '../../../models/user.model';
import { Success, APIError } from '../../../utils';

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
    return new Success({ data: userObject, res }).send();
  } catch (err) {
    next(err);
  }
};
