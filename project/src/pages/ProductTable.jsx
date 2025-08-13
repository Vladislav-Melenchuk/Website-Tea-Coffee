import React from "react";
import "../css/ProductTable.css";

const ProductTable = ({ products, onDelete, onEdit }) => {
    return (
        <div className="admin-product-table">
            <h3>🛒 Список товарів</h3>
            <table>
                <thead>
                <tr>
                    <th>Назва</th>
                    <th>Категорія</th>
                    <th>Ціна</th>
                    <th>Дії</th>
                </tr>
                </thead>
                <tbody>
                {products.map(p => (
                    <tr key={p.id}>
                        <td>{p.title}</td>
                        <td>{p.category}</td>
                        <td>{p.price} грн</td>
                        <td>
                            <button className="table-btn edit" onClick={() => onEdit(p)}>✏️</button>
                            <button className="table-btn delete" onClick={() => onDelete(p.id)}>🗑</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
