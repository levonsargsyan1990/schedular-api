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
    default: '',
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

schema.method({
  /**
   * Finds all providers of service
   *
   * @returns
   */
  providersAsync() {
    return Provider.find({ services: this._id }).exec();
  },
  /**
   * Finds all options of service
   *
   * @returns
   */
  optionsAsync() {
    return Option.find({ serviceId: this._id }).exec();
  },
});

const Service = mongoose.model('Service', schema);

export default Service;
