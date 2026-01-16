require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./Model/AuthModel');

const seedAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('ERROR: MONGO_URI is not defined in .env file');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Database...');

    const adminExists = await User.findOne({ email: 'admin@alsaabautos101.com' });

    if (adminExists) {
      console.log('Admin user already exists. Skipping creation.');
      process.exit(0);
    }

    await User.create({
      username: 'Admin User',
      email: 'admin@alsaabautos101.com',
      password: 'admin09876@@',
      role: 'Admin',
      language: 'English'
    });

    console.log('******************************************');
    console.log('Admin user created successfully!');
    console.log('Email: admin@alsaabautos101.com');
    console.log('Password: admin09876@@');
    console.log('******************************************');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
