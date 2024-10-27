const express = require('express');
const {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} = require('../Controller/supplayres');

const router = express.Router();


router.post('/', createSupplier);


router.get('/', getAllSuppliers);


router.get('/:id', getSupplierById);


router.put('/:id', updateSupplier);


router.delete('/:id', deleteSupplier);

module.exports = router;
