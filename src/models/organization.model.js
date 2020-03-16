import mongoose from 'mongoose';
import Booking from './booking.model';
import Service from './service.model';
import Provider from './provider.model';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  apiSecret: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });


schema.method({
  bookingsAsync() {
    return Booking.find({ organizationId: this._id }).exec();
  },
  servicesAsync() {
    return Service.find({ organizationId: this._id }).exec();
  },
  providersAsync() {
    return Provider.find({ organizationId: this._id }).exec();
  },
});

const Organization = mongoose.model('Organization', schema);

export default Organization;
