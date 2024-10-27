import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function InventoryForm() {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    quantity: '',
    minQuantity: '',
    supplier: '',
  });

  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('http://localhost:5000/suppliers');
        if (!response.ok) throw new Error('Failed to fetch suppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/inventory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to add item');

        const result = await response.json();
        console.log('Item added:', result);

     
        setFormData({
          itemName: '',
          category: '',
          quantity: '',
          minQuantity: '',
          supplier: '',
        });

        navigate('/');

      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };

  const validateForm = () => {
    const qty = Number(formData.quantity);
    const minQty = Number(formData.minQuantity);
    if (
      !formData.itemName ||
      !formData.category ||
      isNaN(qty) || qty < 0 ||
      isNaN(minQty) || minQty < 0 ||
      !formData.supplier
    ) {
      alert('Please fill out all fields correctly.');
      return false;
    }
    return true;
  };

  return (
    <div className="max-w-lg mx-auto p-10 bg-white text-gray-900 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">Inventory Item</h2>
      <form className="space-y-6" onSubmit={handleAdd}>
       
        <div>
          <label className="block text-sm font-semibold">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-3 bg-blue-50 border border-blue-300 rounded-full focus:outline-none focus:border-blue-500"
            placeholder="Enter item name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-3 bg-blue-50 border border-blue-300 rounded-full focus:outline-none focus:border-blue-500"
            placeholder="Enter category"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-3 bg-blue-50 border border-blue-300 rounded-full focus:outline-none focus:border-blue-500"
            placeholder="Enter quantity"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Minimum Quantity</label>
          <input
            type="number"
            name="minQuantity"
            value={formData.minQuantity}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-3 bg-blue-50 border border-blue-300 rounded-full focus:outline-none focus:border-blue-500"
            placeholder="Enter minimum quantity"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold">Supplier</label>
          <select
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-3 bg-blue-50 border border-blue-300 rounded-full focus:outline-none focus:border-blue-500 text-gray-900"
            required
          >
            <option value="" disabled>Select a supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.supplier}
              </option>
            ))}
          </select>
        </div>
      
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-1/2 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-200"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default InventoryForm;
