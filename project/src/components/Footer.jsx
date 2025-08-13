import React from 'react';
import { FaLeaf } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#3A3A2A] text-white text-center py-4">
            <div className="flex justify-center items-center space-x-2">
                <FaLeaf className="text-[#8BA573]" />
                <p>C&T © 2025. Все права защищены.</p>
            </div>
        </footer>
    );
};

export default Footer;
