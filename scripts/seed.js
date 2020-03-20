import { init as initDatabase } from '../src/lib/mongo';

// Importing mongoose models
import Organization from '../src/models/organization.model';
import Service from '../src/models/service.model';

initDatabase();

const dropDB = async () => {
  await Organization.remove({});
  await Service.remove({});
};

const populateDB = async () => {
  // Removing old data
  await dropDB();

  // Creating organization
  const organization = new Organization({
    name: 'Lensman',
  });
  await organization.save();

  // Creating services
  const serviceTemplates = [
    {
      name: 'Service 1',
      description: '',
    },
  ];
};

populateDB();
