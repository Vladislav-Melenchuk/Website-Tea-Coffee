import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { FaShoppingCart, FaUser, FaCoffee, FaUserPlus } from 'react-icons/fa';

const Header = () => {
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const currentUser = localStorage.getItem("currentUser");

        if (token && currentUser) {
            try {
                const parsed = JSON.parse(currentUser);
                setUser(parsed);
            } catch {
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [location.pathname]);

    return (
        <header className="bg-[#3A3A2A] sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6">

                <div className="flex items-center space-x-8">
                    <Link to="/" className="flex items-center text-2xl font-bold text-[#F5F0E6]">
                        <FaCoffee className="mr-2" /> Coffee&Tea
                    </Link>

                    <nav className="flex space-x-6 text-lg font-medium">
                        <Link to="/" className="text-[#F5F0E6] hover:text-[#C78751] transition">Главная</Link>
                        <Link to="/catalog" className="text-[#F5F0E6] hover:text-[#C78751] transition">Каталог</Link>
                        <Link to="/contacts" className="text-[#F5F0E6] hover:text-[#C78751] transition">Контакты</Link>
                    </nav>
                </div>


                <div className="flex items-center space-x-4">

                    <Link
                        to="/cart"
                        className="flex items-center justify-center w-[45px] h-[45px] border border-[#C78751] text-[#C78751] rounded-full
              transition duration-300 hover:border-[#F5E8C7] hover:text-[#F5E8C7]
              hover:shadow-[0_0_8px_2px_rgba(199,135,81,0.7)]"
                    >
                        <FaShoppingCart />
                    </Link>


                    {user ? (
                        <Link
                            to="/profile"
                            className="flex items-center justify-center px-4 py-2 border border-[#8BA573] text-[#8BA573] rounded-full
                transition duration-300 hover:border-[#B7D59A] hover:text-[#B7D59A]
                hover:shadow-[0_0_8px_2px_rgba(139,165,115,0.7)]"
                        >
                            <FaUser className="mr-2" />
                            <span className="hidden md:inline text-sm font-medium">{user.name}</span>
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="flex items-center justify-center w-[45px] h-[45px] border border-[#F5F0E6] text-[#F5F0E6] rounded-full
                  transition duration-300 hover:border-[#FFFFFF] hover:text-[#FFFFFF]
                  hover:shadow-[0_0_8px_2px_rgba(245,240,230,0.7)]"
                            >
                                <FaUser />
                            </Link>
                            <Link
                                to="/register"
                                className="flex items-center justify-center w-[45px] h-[45px] border border-[#8BA573] text-[#8BA573] rounded-full
                  transition duration-300 hover:border-[#B7D59A] hover:text-[#B7D59A]
                  hover:shadow-[0_0_8px_2px_rgba(139,165,115,0.7)]"
                            >
                                <FaUserPlus />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
