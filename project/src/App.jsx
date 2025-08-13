import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from "./pages/Profile.jsx";
import Catalog from "./pages/Catalog.jsx";
import AdminPanel from './pages/AdminPanel.jsx';
import ProductDetails from "./components/Product";
import ThankYou from './pages/ThankYou';
import Checkout from "./pages/Checkout.jsx";
import Orders from './pages/Orders';
import Contact from './pages/Contacts.jsx';


function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-[#F5F0E6] text-[#3A3A2A]">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/admin54" element={<AdminPanel />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/thank-you" element={<ThankYou />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/contacts" element={<Contact />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
