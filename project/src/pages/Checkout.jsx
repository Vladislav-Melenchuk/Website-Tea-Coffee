import React, { useState, useEffect } from "react";
import { getCart, clearCart, cartTotal } from "../components/cart";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5214";

const Checkout = () => {
  const [items, setItems] = useState(getCart());
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    comment: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sync = () => setItems(getCart());
    window.addEventListener("cart:changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cart:changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      alert("Будь ласка, заповніть всі обов’язкові поля");
      return;
    }
    if (!items.length) {
      alert("Кошик порожній");
      return;
    }


    const payload = {
      customerName: form.name,
      phone: form.phone,
      address: form.address,
      comment: form.comment,
      items: items.map(i => ({
        productId: i.id,
        quantity: i.qty,
        price: i.price
      }))
    };

    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": "Bearer " + token } : {})
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Помилка створення замовлення");
      }

      clearCart();
      navigate("/thank-you");
    } catch (err) {
      console.error(err);
      alert("Не вдалося оформити замовлення");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
        <div className="min-h-screen bg-[#2B2B2B] flex items-center justify-center">
          <div className="bg-[#3A3A2A] text-[#F5F0E6] px-6 py-4 rounded-lg">
            Ваша корзина порожня
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#2B2B2B] py-10">
        <div className="max-w-3xl mx-auto bg-[#3A3A2A] p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl text-[#F5F0E6] font-bold mb-6">Оформлення замовлення</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="name"
                placeholder="Ім’я*"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#2B2B2B] text-[#F5F0E6] border border-[#555]"
            />
            <input
                type="tel"
                name="phone"
                placeholder="Телефон*"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#2B2B2B] text-[#F5F0E6] border border-[#555]"
            />
            <input
                type="text"
                name="address"
                placeholder="Адреса доставки*"
                value={form.address}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#2B2B2B] text-[#F5F0E6] border border-[#555]"
            />
            <textarea
                name="comment"
                placeholder="Коментар до замовлення"
                value={form.comment}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#2B2B2B] text-[#F5F0E6] border border-[#555] h-24 resize-none"
            />

            <div className="flex justify-between items-center text-[#F5F0E6] font-semibold">
              <span>Разом:</span>
              <span>{cartTotal(items).toFixed(2)} грн</span>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8BA573] hover:bg-[#77915f] text-white py-3 rounded-lg font-medium transition disabled:opacity-60"
            >
              {loading ? "Відправка..." : "Підтвердити замовлення"}
            </button>
          </form>
        </div>
      </div>
  );
};

export default Checkout;
