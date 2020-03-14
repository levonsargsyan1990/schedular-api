import mongoose from 'mongoose';

export const init = () => {
    const { MONGO_URL } = process.env;
    mongoose.connect(MONGO_URL);
}