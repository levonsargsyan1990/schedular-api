import mongoose from 'mongoose';
import env from '../config/env';

export const init = () => {
  mongoose.connect(env.mongo.url);
};
