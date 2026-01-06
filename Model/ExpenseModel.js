const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  vehicleVin: { type: String, required: true },
  expenseType: { type: String, enum: ['Towing', 'Repair', 'Fuel', 'Other'], required: true },
  description: { type: String },
  amount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
