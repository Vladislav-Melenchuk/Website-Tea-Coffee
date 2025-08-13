import React, { useState } from "react";
import "../css/AddProduct.css";

const categories = ["Кава", "Чай", "Аксесуари"];

const AddProduct = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: categories[0],
        imageUrl: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5214/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, price: parseFloat(formData.price) }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Помилка сервера:", errorText);
                alert("Помилка при додаванні товару");
                return;
            }

            const newProduct = await response.json();
            onAdd(newProduct);
            onClose();
        } catch (err) {
            console.error("Fetch помилка:", err);
            alert("Не вдалося відправити запит на сервер");
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-window" onClick={(e) => e.stopPropagation()}>
                <h2>➕ Додати товар</h2>
                <form onSubmit={handleSubmit}>
                    <input name="title" value={formData.title} onChange={handleChange} placeholder="Назва" required />
                    <input name="description" value={formData.description} onChange={handleChange} placeholder="Опис" required />
                    <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Ціна" required />


                    <select name="category" value={formData.category} onChange={handleChange} required>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="URL зображення" required />
                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">Зберегти</button>
                        <button type="button" className="btn-secondary" onClick={onClose}>Скасувати</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
