import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import env from '../config/env';

const { ObjectId } = mongoose.Schema.Types;

const organizationSchema = new mongoose.Schema({
  organizationId: {
    type: ObjectId,
    required: true,
  },
  role: {
    type: String,
    default: 'member',
    enum: ['member', 'owner'],
    required: true,
  },
}, { minimize: false });

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  organizations: {
    type: [organizationSchema],
    required: true,
    default: [],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: { type: String, required: true },
}, { timestamps: true });

schema.pre('save', async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  // generate a salt
  try {
    const salt = await bcrypt.genSalt(env.auth.passwordSalt);
    // hash the password using our new salt
    const hash = await bcrypt.hash(this.password, salt);
    // override the cleartext password with the hashed one
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

schema.method({
  /**
   * Checks if password is correct
   *
   * @returns
   */
  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  },
});

const User = mongoose.model('User', schema);

export default User;
