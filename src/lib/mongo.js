import mongoose from 'mongoose';
import { mongo } from '../config/env';

export const init = () => {
  mongoose.connect(mongo.url);
};
