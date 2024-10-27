import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 

function InventoryEditPage() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    quantity: '',
    minQuantity: '',
  });
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/inventory/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        itemName: initialData.itemName,
        category: initialData.category,
        quantity: initialData.quantity,
        minQuantity: initialData.minQuantity,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`http://localhost:5000/inventory/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Item updated successfully:', data);
        alert('Item updated successfully!');
        navigate('/'); 
      } catch (error) {
        console.error('Error updating item:', error);
        alert('Failed to update the item. Please try again.');
      }
    }
  };

  const validateForm = () => {
    if (!formData.itemName || !formData.category || !formData.quantity || !formData.minQuantity) {
      alert('Please fill out all fields.');
      return false;
    }
    if (isNaN(formData.quantity) || isNaN(formData.minQuantity)) {
      alert('Quantity and Minimum Quantity should be numbers.');
      return false;
    }
    return true;
  };

  return (
    <div className="max-w-lg mx-auto p-10 bg-white text-gray-900 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">Edit Inventory Item</h2>
      <form className="space-y-6" onSubmit={handleUpdate}>
        <div>
          <label className="block text-sm font-semibold">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-3 bg-blue-50 border border-blue-300 rounded-full focus:outline-none focus:border-blue-500"
            placeholder="Enter item name"
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
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-1/2 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-200"
          >
            Update Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default InventoryEditPage;
