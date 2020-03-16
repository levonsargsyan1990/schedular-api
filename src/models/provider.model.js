import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  organizationId: {
    type: ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  services: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Provider = mongoose.model('Provider', schema);

export default Provider;
