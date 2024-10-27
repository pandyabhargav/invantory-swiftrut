const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplier: {
    type: String,
    required: true,
    trim: true,
  },
  contactNo: {
    type: String,
    required: true,
    trim: true,
  },
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
