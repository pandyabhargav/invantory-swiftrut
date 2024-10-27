const Supplier = require('../Models/suplaireScema');


exports.createSupplier = async (req, res) => {
  const { supplier, contactNo } = req.body;

  try {
    const newSupplier = new Supplier({ supplier, contactNo });
    await newSupplier.save();
    res.status(201).json({ message: 'Supplier added successfully', newSupplier });
  } catch (error) {
    res.status(400).json({ message: 'Error adding supplier', error });
  }
};


exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching suppliers', error });
  }
};


exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching supplier', error });
  }
};


exports.updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json({ message: 'Supplier updated successfully', updatedSupplier });
  } catch (error) {
    res.status(400).json({ message: 'Error updating supplier', error });
  }
};


exports.deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting supplier', error });
  }
};
