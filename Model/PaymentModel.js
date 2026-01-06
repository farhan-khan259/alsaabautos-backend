const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  source: { type: String, required: true },
  date: { type: Date, required: true },
  remarks: { type: String },
  lotNumber: { type: String },
  investor: { type: String, required: true },
  status: { type: String, default: 'Completed' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
