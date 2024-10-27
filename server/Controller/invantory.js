const Inventory = require('../Models/invantoryscema');


exports.createInventoryItem = async (req, res) => {
  const { itemName, category, quantity, minQuantity, supplier } = req.body;

  try {
    const newItem = new Inventory({ itemName, category, quantity, minQuantity, supplier });
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully', newItem });
  } catch (error) {
    res.status(400).json({ message: 'Error adding item', error });
  }
};


exports.getAllInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find().populate('supplier');
    res.json(inventoryItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory items', error });
  }
};


exports.getInventoryItemById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id).populate('supplier');
    console.log(item);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error });
  }
};


exports.updateInventoryItem = async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item updated successfully', updatedItem });
  } catch (error) {
    res.status(400).json({ message: 'Error updating item', error });
  }
};


exports.deleteInventoryItem = async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
};
