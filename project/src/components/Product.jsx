import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockProducts = [
    {
        id: 1,
        name: "Кава Арабіка",
        description: "Повний опис кави з нотами шоколаду і м'яким ароматом.",
        price: 199,
        image: "https://via.placeholder.com/600x400?text=Кава",
        category: "Кава",
    },
];

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = mockProducts.find(p => p.id === parseInt(id));

    if (!product) return <div style={{ padding: "2rem" }}>Товар не знайдено</div>;

    return (
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    background: "#eee",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    border: "none",
                    marginBottom: "1rem",
                    cursor: "pointer"
                }}
            >
                ← Назад
            </button>

            <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "12px" }} />
            <h1>{product.name}</h1>
            <p style={{ fontSize: "1.1rem", marginTop: "1rem" }}>{product.description}</p>
            <h3 style={{ marginTop: "1rem" }}>{product.price} грн</h3>
            <button style={{
                marginTop: "1rem",
                padding: "0.7rem 1.5rem",
                background: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
            }}>
                У кошик
            </button>
        </div>
    );
};

export default ProductDetails;
