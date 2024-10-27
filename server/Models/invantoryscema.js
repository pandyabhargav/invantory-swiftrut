const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  minQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
