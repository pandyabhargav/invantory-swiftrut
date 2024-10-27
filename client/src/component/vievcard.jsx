
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InventoryManagement = () => {
  const navigate = useNavigate();
  
  const InventoryCard = ({ item, onEdit, onDelete }) => {
    const isBelowMin = parseInt(item.quantity, 10) < parseInt(item.minQuantity, 10);
  
    const supplierName = item.supplier && item.supplier.supplier ? item.supplier.supplier : "Unknown Supplier";
  
    return (
      <div className={`p-6 bg-white rounded-lg shadow-lg border-l-4 m-2 ${isBelowMin ? 'border-red-500' : 'border-green-500'} w-full sm:w-80 transition-transform transform hover:shadow-xl hover:scale-105 mb-6`}>
        <h3 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">{item.itemName}</h3>
        <p className="text-gray-700">Category: <span className="font-medium">{item.category}</span></p>
        <p className="text-gray-700">Qty: <span className="font-medium">{item.quantity}</span></p>
        <p className="text-gray-700">Supplier: <span className="font-medium">{supplierName}</span></p>
        <p className="text-gray-700">Contact: <span className="font-medium">{item.contactNo}</span></p>
        <p className="text-gray-700">Min Qty: <span className="font-medium">{item.minQuantity}</span></p>
        {isBelowMin && (
          <div className="mt-3 p-2 bg-red-100 text-red-700 font-bold rounded-lg text-sm">
            Alert: Below minimum!
          </div>
        )}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => navigate(`/editForm/${item._id}`)} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors">
            Edit
          </button>
          <button
            onClick={() => onDelete(item)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    );
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://invantory-swiftrut.onrender.com/inventory');
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleEdit = async (item) => {
    console.log('Editing item:', item);
    const updatedItem = { ...item, quantity: parseInt(item.quantity, 10) + 1 };
    try {
      const response = await fetch(`https://invantory-swiftrut.onrender.com/inventory/${item._id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (item) => {
    console.log('Deleting item:', item);
    if (window.confirm(`Are you sure you want to delete ${item.itemName}?`)) {
      try {
        const response = await fetch(`https://invantory-swiftrut.onrender.com/inventory/${item._id}`, { 
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete item');
        }

        fetchItems();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleExport = () => {
    const csvRows = [
      ['Item Name', 'Category', 'Quantity', 'Supplier', 'Contact No', 'Min Quantity'],
      ...items.map(item => [item.itemName, item.category, item.quantity, item.supplier, item.contactNo, item.minQuantity])
    ];

    const csvString = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

const handleImport = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const content = e.target.result;
    const rows = content.split('\n').slice(1); 

    const newItems = rows
      .map(row => row.trim()) 
      .filter(row => row) 
      .map(row => {
        const [itemName, category, quantity, supplier, contactNo, minQuantity] = row.split(',');
        console.log('Row Data:', row);

        return {
          itemName: itemName.trim(),
          category: category.trim(),
          quantity: parseInt(quantity.trim(), 10),
          supplier: supplier.trim(),
          contactNo: contactNo.trim(),
          minQuantity: parseInt(minQuantity.trim(), 10) 
        };
      });

    for (const newItem of newItems) {
      console.log('New Item:', newItem); 
      try {
        await fetch('https://invantory-swiftrut.onrender.com/inventory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        });
      } catch (error) {
        console.error("Error importing item:", error);
      }
    }
    fetchItems();
  };
  reader.readAsText(file);
};

  

  return (
    <div className="container mx-auto p-8 bg-gray-100 text-gray-900 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-800">Inventory Items</h2>
      <div className="flex justify-between mb-6">
        <div className="flex">
          <input
            type="file"
            accept=".csv"
            onChange={handleImport}
            className="border rounded-lg px-4 py-2 mr-4 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-300 transition-all"
          />
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors">
            Export to CSV
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {items.map(item => (
          <InventoryCard
            key={item._id} 
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default InventoryManagement;
