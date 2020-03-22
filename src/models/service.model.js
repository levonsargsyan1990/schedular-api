import mongoose from 'mongoose';
import Provider from './provider.model';
import Option from './option.model';

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
  description: {
    type: String,
    required: true,
    default: '',
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
}, { timestamps: true });

schema.method({
  /**
   * Finds all providers of service
   *
   * @returns
   */
  providers() {
    return Provider.find({ services: this._id }).exec();
  },
  /**
   * Finds all options of service
   *
   * @returns
   */
  options() {
    return Option.find({ serviceId: this._id }).exec();
  },
  /**
   * Deletes all options of service
   *
   * @returns
   */
  removeOptions() {
    return Option.deleteMany({ serviceId: this._id }).exec();
  },
  /**
   * Deletes service from providers
   *
   * @returns
   */
  removeFromProviders() {
    return Provider.updateMany({ services: this._id }, { $pull: { services: this._id } }).exec();
  },
});

const Service = mongoose.model('Service', schema);

export default Service;
