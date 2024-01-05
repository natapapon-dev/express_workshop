const roleSchema = require('../models/roles.model');
const roleRepo = require('../repository/roles.repository');

const rolesData = [
  { roleName: 'admin', roleDescription: 'admin' },
  { roleName: 'user', roleDescription: 'user' },
];

async function seedDatabase() {
  try {
    const roles = await roleRepo.getAllRole();
    if (roles.length < 1) {
      await roleSchema.insertMany(rolesData);
      console.log('Database seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
