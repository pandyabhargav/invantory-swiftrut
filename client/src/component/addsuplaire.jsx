import React, { useState } from 'react';

function SupplierContactForm() {
  const [supplierData, setSupplierData] = useState({
    supplier: '',
    contactNo: '',
  });

  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/suppliers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(supplierData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Supplier added successfully:', data);
          setSupplierData({
            supplier: '',
            contactNo: '',
          });
        } else {
          console.error('Failed to add supplier:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding supplier:', error);
      }
    }
  };

  const validateForm = () => {
    if (!supplierData.supplier || !supplierData.contactNo) {
      alert('Please fill out all fields.');
      return false;
    }
    return true;
  };

  return (
    <div className="max-w-lg mx-auto p-10 bg-white text-gray-900 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">Add Supplier</h2>
      <form className="space-y-6" onSubmit={handleAddSupplier}>
        <div>
          <label className="block text-sm font-semibold">Supplier Name</label>
          <input
            type="text"
            name="supplier"
            value={supplierData.supplier}
            onChange={handleSupplierChange}
            className="mt-2 w-full px-4 py-3 bg-blue-50 border border-blue-300 rounded-full focus:outline-none focus:border-blue-500"
            placeholder="Enter supplier name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Contact No</label>
          <input
            type="tel"
            name="contactNo"
            value={supplierData.contactNo}
            onChange={handleSupplierChange}
            className="mt-2 w-full px-4 py-3 bg-blue-50 border border-blue-300 rounded-full focus:outline-none focus:border-blue-500"
            placeholder="Enter contact number"
            required
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-1/2 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-200"
          >
            Add Supplier
          </button>
        </div>
      </form>
    </div>
  );
}

export default SupplierContactForm;
