const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('./models/user');
const Organization = require('./models/organization');
const { generateBcryptPassword } = require('./encryption');

const MONGODB_URI = 'mongodb+srv://subramaniamdev01:qwerty1234@cluster.fzqbthd.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const clearCollections = async () => {
    await User.deleteMany({});
    await Organization.deleteMany({});
};

const createUsers = async () => {
    const users = [];
    const roles = ['user', 'admin'];

    for (let i = 0; i < 10; i++) {
        const user = new User({
            name: faker.name.fullName(),
            email: faker.internet.email(),
            role: roles[Math.floor(Math.random() * roles.length)],
            password: await generateBcryptPassword("adcb1234")  //'adcb1234'
        });
        users.push(user.save());
    }

    return Promise.all(users);
};

const createOrganisations = async (userIds) => {
    const organisations = [];

    for (let i = 0; i < 5; i++) { // Adjust the number of organisations as needed
        const organisation = new Organization({
            name: faker.company.name(),
            users: faker.helpers.arrayElements(userIds, Math.floor(Math.random() * userIds.length) + 1)
        });
        organisations.push(organisation.save());
    }

    return Promise.all(organisations);
};

const seedDatabase = async () => {
    try {
        await clearCollections();
        const users = await createUsers();
        console.log(users, "users")
        const userIds = users.map(user => user._id);
        await createOrganisations(userIds);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

// seedDatabase();
