import fs from 'fs';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import env from '../src/config/env';
import { init as initDatabase } from '../src/lib/mongo';

// Importing mongoose models
import Organization from '../src/models/organization.model';
import Service from '../src/models/service.model';
import Option from '../src/models/option.model';
import Provider from '../src/models/provider.model';
import Booking from '../src/models/booking.model';

import postman from '../postman/template.json';

initDatabase();

const dropDB = async () => {
  console.info('Removing existing data...');
  await Organization.deleteMany({});
  await Service.deleteMany({});
  await Option.deleteMany({});
  await Provider.deleteMany({});
  await Booking.deleteMany({});
  console.info('Data successfully removed.');
};

const addEnv = (key, value) => postman.values.push({ key, value, enabled: true });

const populateDB = async () => {

  try {
    // Removing old data
    await dropDB();
    console.info('Populating DB with sample data...');

    postman.name = `Local (port ${env.port})`;

    addEnv('port', env.port);
    addEnv('baseURL', `http://localhost:${env.port}`);

    // Creating organization
    const organization = new Organization({
      name: 'Lensman',
    });

    addEnv('apiKey', organization.apiKey);
    addEnv('apiSecret', organization.apiSecret);

    await organization.save();
    const token = jwt.sign({ organizationId: organization._id }, env.jwt.secret);
    addEnv('token', token);

    // Creating services
    const serviceTemplates = [
      {
        name: 'Service 1',
        organizationId: organization._id,
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
      },
      {
        name: 'Service 2',
        organizationId: organization._id,
        description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
      },
    ];

    const servicePromises = serviceTemplates.map((template) => {
      const service = new Service(template);
      return service.save();
    });

    const services = await Promise.all(servicePromises);
    const [service] = services;
    addEnv('serviceId', service._id.toString());

    // Creating options
    const optionTemplates = [
      {
        organizationId: organization._id,
        serviceId: service._id,
        duration: 30,
        durationTimeUnit: 'm',
        price: 10000,
      },
      {
        organizationId: organization._id,
        serviceId: service._id,
        duration: 1,
        durationTimeUnit: 'h',
        price: 20000,
      },
    ];

    const optionPromises = optionTemplates.map((template) => {
      const option = new Option(template);
      return option.save();
    });

    const options = await Promise.all(optionPromises);
    const [option] = options;
    addEnv('optionId', option._id.toString());

    // Creating providers
    const providerTemplates = [
      {
        organizationId: organization._id,
        name: 'Provider 1',
        services: services.map(({ _id }) => _id),
      },
      {
        organizationId: organization._id,
        name: 'Provider 2',
        services: service._id,
      },
    ];

    const providerPromises = providerTemplates.map((template) => {
      const provider = new Provider(template);
      return provider.save();
    });

    const providers = await Promise.all(providerPromises);
    const [provider] = providers;
    addEnv('providerId', provider._id.toString());

    // Creating bookings
    const bookingTemplates = [
      {
        organizationId: organization._id,
        serviceId: service._id,
        optionId: option._id,
        providerId: provider._id,
        start: moment()
          .utc()
          .day(9)
          .hour(13)
          .minute(0)
          .second(0)
          .toDate(),
        location: {
          address: 'Armenian Opera Theatre',
          long: 40.1852508,
          lat: 44.5147831,
        },
        name: 'Booking 1',
        duration: option.duration,
        durationTimeUnit: option.durationTimeUnit,
        price: option.price,
        currency: option.currency,
      },
      {
        organizationId: organization._id,
        serviceId: service._id,
        optionId: options[1]._id,
        providerId: provider._id,
        start: moment()
          .utc()
          .day(10)
          .hour(13)
          .minute(0)
          .second(0)
          .toDate(),
        location: {
          address: 'Armenian Opera Theatre',
          long: 40.1852508,
          lat: 44.5147831,
        },
        name: 'Booking 2',
        duration: options[1].duration,
        durationTimeUnit: options[1].durationTimeUnit,
        price: options[1].price,
        currency: options[1].currency,
      },
    ];

    const bookingPromises = bookingTemplates.map((template) => {
      const booking = new Booking({
        ...template,
        end: moment(template.start)
          .add(template.duration, template.durationTimeUnit)
          .toDate(),
      });
      return booking.save();
    });

    const bookings = await Promise.all(bookingPromises);
    const [booking] = bookings;
    addEnv('bookingId', booking._id.toString());
    console.info('DB successfully populated.');
    console.info('Generating Postman environment file...');
    fs.writeFile(
      `./postman/generated/${moment().format('DD-MM-YYYY')}.local.json`,
      JSON.stringify(postman),
      (err) => {
        if (err) {
          console.error('Failed to save postman file', err);
          process.exit(1);
        } else {
          console.info('Postman environment file successfully created');
          process.exit(0);
        }
      },
    );
  } catch (err) {
    console.log('Failed to populate DB', err);
    process.exit(1);
  }
};

populateDB();
