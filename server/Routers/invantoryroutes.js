const express = require('express');
const {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem,
} = require('../Controller/invantory');

const router = express.Router();


router.post('/', createInventoryItem);


router.get('/', getAllInventoryItems);


router.get('/:id', getInventoryItemById);


router.put('/:id', updateInventoryItem);


router.delete('/:id', deleteInventoryItem);

module.exports = router;
