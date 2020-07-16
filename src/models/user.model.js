import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import Card from './card.model';
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
}, { _id : false, minimize: false });

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
  password: {
    type: String,
    required: true,
    min: 8,
    select: false,
  },
  stripeCustomerId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

schema.pre('save', async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  // generate a salt
  try {
    const salt = await bcrypt.genSalt(env.auth.saltRounds);
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
   * @param {String} candidatePassword time period to check
   * @returns {Boolean}
   */
  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  },

  /**
   * Finds default card of user
   *
   * @param {String} candidatePassword time period to check
   * @returns {Boolean}
   */
  async card() {
    return Card.findOne({ userId: this._id, isDefault: true }).exec();
  },

  /**
   * Finds all cards of user
   *
   * @param {String} candidatePassword time period to check
   * @returns {Boolean}
   */
  async cards() {
    return Card.find({ userId: this._id }).exec();
  },

  /**
   * Finds all cards of user
   *
   * @param {String} candidatePassword time period to check
   * @returns {Boolean}
   */
  async hasBillingMethod() {
    return !!await this.card();
  },

  /**
   * Adds new organization
   *
   * @param {Object} params New organization parameters
   * @param {ObjectId} params.organizationId ID of new organization
   * @param {String} params.role Role of user in new organization
   * @returns {User}
   */
  // async addOrganization({ organizationId, role = 'member' }) {
  //   // TODO: check for limit of organizations
  //   const organization = find(this.organizations, { organizationId });
  //   console.log({ organization });
  //   if (!organization) {
  //     const newOrganization = {
  //       organizationId,
  //       role,
  //     };
  //     console.log(this, [...this.organizations, newOrganization]);
  //     this.organizations = [...this.organizations, newOrganization];
  //     this.firstName = 'LEO';
  //     // return newOrganization;
  //   }
  //   // return organization;
  // },
});

const User = mongoose.model('User', schema);

export default User;
