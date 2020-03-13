import mongoose from 'mongoose';

const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL);