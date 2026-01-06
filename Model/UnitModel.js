const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  make: { type: String, required: true },
  number: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  customerName: { type: String },
  vinNumber: { type: String, required: true, unique: true },
  lotNumber: { type: String, required: true },
  purchaseAuction: { type: String, required: true },
  purchaseAmount: { type: Number, required: true },
  expenses: { type: Number, default: 0 },
  purchaseDate: { type: Date, required: true },
  taxAmount: { type: Number, default: 0 },
  saleAuction: { type: String },
  saleAmount: { type: Number },
  saleDate: { type: Date },
  status: { 
    type: String, 
    enum: ['available', 'sold', 'maintenance', 'reserved', 'in stock'], 
    default: 'available' 
  },
  investors: [{ type: String }],
  images: [{ type: String }],
  invoices: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Unit', unitSchema);
