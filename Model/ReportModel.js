const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  carId: { type: String, required: true },
  customerName: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  salesPrice: { type: Number, required: true },
  netProfit: { type: Number },
  investors: [{
    name: String,
    profit: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
