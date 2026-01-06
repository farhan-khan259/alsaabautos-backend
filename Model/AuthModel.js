const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['Admin', 'Manager', 'Editor', 'Viewer'],
    default: 'Admin'
  },
  profilePic: {
    type: String
  },
  language: {
    type: String,
    default: 'English'
  }
}, { timestamps: true });

authSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

authSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', authSchema);
module.exports = User;
