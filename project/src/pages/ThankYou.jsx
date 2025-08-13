import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
    return (
        <div className="min-h-screen bg-[#2B2B2B] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl text-[#8BA573] font-bold mb-4">
                Дякуємо за замовлення!
            </h1>
            <p className="text-[#F5F0E6]/80 mb-6">
                Ми скоро зв’яжемося з вами для підтвердження.
            </p>
            <Link
                to="/"
                className="bg-[#C78751] hover:bg-[#b1723f] text-white px-6 py-3 rounded-lg transition"
            >
                Повернутися в каталог
            </Link>
        </div>
    );
};

export default ThankYou;
