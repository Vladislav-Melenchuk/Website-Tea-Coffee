import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { getCart, updateQty, removeItem, clearCart, cartTotal } from "../components/cart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [items, setItems] = useState(getCart());
    const navigate = useNavigate();

    useEffect(() => {
        const sync = () => setItems(getCart());
        window.addEventListener("cart:changed", sync);
        window.addEventListener("storage", sync);
        return () => {
            window.removeEventListener("cart:changed", sync);
            window.removeEventListener("storage", sync);
        };
    }, []);

    const inc = (id) => updateQty(id, (items.find(x => x.id === id)?.qty || 1) + 1);
    const dec = (id) => updateQty(id, (items.find(x => x.id === id)?.qty || 1) - 1);
    const del = (id) => removeItem(id);

    return (
        <div className="min-h-screen bg-[#2B2B2B]">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <h2 className="text-2xl text-[#F5F0E6] font-bold mb-6 flex items-center">
                    <FaShoppingCart className="mr-3 text-[#C78751]" /> Корзина
                </h2>

                {items.length === 0 ? (
                    <div className="bg-[#3A3A2A] text-[#F5F0E6]/80 rounded-xl p-6">
                        Ваша корзина пуста.
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="bg-[#3A3A2A] rounded-xl p-4 flex gap-4 items-center">
                                    <div className="w-24 h-24 bg-[#2B2B2B] rounded-lg flex items-center justify-center overflow-hidden">
                                        <img src={item.imageUrl} alt={item.title} className="object-contain max-h-full" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[#F5F0E6] font-semibold">{item.title}</div>
                                        <div className="text-[#F5F0E6]/60 text-sm">{item.category}</div>
                                        <div className="text-[#C78751] font-semibold mt-1">{item.price} грн</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => dec(item.id)} className="px-2 py-2 rounded-lg bg-[#2B2B2B] text-white/80 hover:text-white"><FaMinus /></button>
                                        <span className="w-8 text-center text-[#F5F0E6]">{item.qty}</span>
                                        <button onClick={() => inc(item.id)} className="px-2 py-2 rounded-lg bg-[#2B2B2B] text-white/80 hover:text-white"><FaPlus /></button>
                                    </div>
                                    <button onClick={() => del(item.id)} className="ml-3 px-3 py-2 rounded-lg bg-[#2B2B2B] text-red-400 hover:text-red-300"><FaTrash /></button>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#3A3A2A] rounded-xl p-6 h-fit">
                            <div className="flex justify-between text-[#F5F0E6] text-lg font-semibold">
                                <span>Разом:</span>
                                <span>{cartTotal(items).toFixed(2)} грн</span>
                            </div>
                            <button
                                className="mt-4 w-full px-4 py-3 rounded-lg bg-[#8BA573] text-white hover:bg-[#77915f] transition"
                                onClick={() => navigate("/checkout")}
                            >
                                Оформити замовлення
                            </button>
                            <button
                                onClick={() => clearCart()}
                                className="mt-2 w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition"
                            >
                                Очистити кошик
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
