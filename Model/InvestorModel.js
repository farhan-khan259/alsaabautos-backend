const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  investorId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  joinDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  initialInvestment: { type: Number, required: true },
  profitShare: { type: Number, required: true },
  currentBalance: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Investor', investorSchema);
