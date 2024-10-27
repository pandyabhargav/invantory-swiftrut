
import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import InventoryForm from '../component/addpr'; 
import Header from './Header'; 
import InventoryPage from './vievcard'; 
import InventoryEditForm from './edit'; 
import SupplierContactForm from './addsuplaire'; 

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            <aside className="w-1/6 bg-white p-6 text-gray-800">
                <h2 className="text-3xl font-semibold mb-8 text-center text-orange-500">Admin Panel</h2>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center p-3 rounded hover:bg-gray-200 transition duration-300 ease-in-out"
                            >
                                <span className="text-lg font-medium">View Inventory</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/addForm"
                                className="flex items-center p-3 rounded hover:bg-gray-200 transition duration-300 ease-in-out"
                            >
                                <span className="text-lg font-medium">Add Inventory</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/addSupplier"
                                className="flex items-center p-3 rounded hover:bg-gray-200 transition duration-300 ease-in-out"
                            >
                                <span className="text-lg font-medium">Add Supplier</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 p-6 bg-gray-800">
                <Header />
                <Routes>
                    <Route path="/" element={<InventoryPage />} />
                    <Route path="/addForm" element={<InventoryForm />} />
                    <Route path="/editForm/:id" element={<InventoryEditForm />} />
                    <Route path="/addSupplier" element={<SupplierContactForm />} />
                </Routes>
            </main>
        </div>
    );
};

export default Dashboard;
