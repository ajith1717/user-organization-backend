const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Cases = require('./models/cases');

const MONGODB_URI = 'mongodb+srv://adkerapp:QwirvxiJnqcwDoSy@adker-app.38kfu6y.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const clearCollections = async () => {
    await Cases.deleteMany({});
    await Organization.deleteMany({});
};

const createCases = async () => {
    const Case = [];

    for (let i = 0; i < 10; i++) {
        const casess = new Cases({
            parentId: Math.random().toString(36).substring(2, 8).toUpperCase(),
        });
        Case.push(casess.save());
    }

    return Promise.all(Case);
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
        await createCases();
        // const users = await createUsers();
        // console.log(users, "users")
        // const userIds = users.map(user => user._id);
        // await createOrganisations(userIds);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
