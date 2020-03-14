import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  apiKey: { type: String, required: true },
  apiSecret: { type: String, required: true },
}, { timestamps: true });

const Organization = mongoose.model('Organization', schema);

export default Organization;
