import React, { useEffect, useState } from "react";
import "../css/AdminPanel.css";
import ProductTable from "./ProductTable";
import AddProductModal from "./AddProduct";
import EditProductModal from "./EditProduct";

const API_BASE = "http://localhost:5214";

const AdminPanel = () => {

    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [editProduct, setEditProduct] = useState(null);


    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // Для выбранного заказа
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [statusUpdating, setStatusUpdating] = useState(false);


    useEffect(() => {
        fetch(`${API_BASE}/api/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(() => alert("Помилка при завантаженні товарів"));
    }, []);


    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {
        setLoadingOrders(true);
        fetch(`${API_BASE}/api/orders`)
            .then(res => {
                if (!res.ok) throw new Error("Помилка завантаження замовлень");
                return res.json();
            })
            .then(data => setOrders(data))
            .catch(err => alert(err.message))
            .finally(() => setLoadingOrders(false));
    };

    const handleAddProduct = (newProduct) => {
        setProducts(prev => [...prev, newProduct]);
    };

    const handleUpdateProduct = (updatedProduct) => {
        setProducts(prev =>
            prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
        );
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Ви дійсно хочете видалити цей товар?")) return;

        const response = await fetch(`${API_BASE}/api/products/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setProducts(prev => prev.filter(p => p.id !== id));
        } else {
            alert("Помилка при видаленні товару");
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product);
    };

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );


    const selectOrder = (order) => {
        setSelectedOrder(order);
    };


    const handleStatusChange = async (e) => {
        if (!selectedOrder) return;

        const newStatus = e.target.value;
        setStatusUpdating(true);

        try {
            const res = await fetch(`${API_BASE}/api/orders/${selectedOrder.id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error("Помилка оновлення статусу");


            setSelectedOrder(prev => ({ ...prev, status: newStatus }));
            setOrders(prev =>
                prev.map(o => (o.id === selectedOrder.id ? { ...o, status: newStatus } : o))
            );
        } catch (err) {
            alert(err.message);
        } finally {
            setStatusUpdating(false);
        }
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div className="admin-content">
                    <h1>Панель управління</h1>
                    <div className="admin-nav-buttons">
                        <input
                            type="text"
                            placeholder="Пошук товару..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn-primary" onClick={() => setShowModal(true)}>
                            ➕ Додати товар
                        </button>
                    </div>
                </div>
            </header>

            <div className="admin-content">
                <div className="admin-two-grid">

                    <section className="admin-box admin-left">
                        <h3>📦 Активні замовлення</h3>
                        {loadingOrders ? (
                            <p>Завантаження замовлень...</p>
                        ) : orders.length === 0 ? (
                            <p>Замовлень немає</p>
                        ) : (
                            <ul className="orders-list" style={{ maxHeight: 400, overflowY: "auto" }}>
                                {orders.map(o => (
                                    <li
                                        key={o.id}
                                        onClick={() => selectOrder(o)}
                                        style={{
                                            cursor: "pointer",
                                            padding: "8px",
                                            backgroundColor: selectedOrder?.id === o.id ? "#8ba573" : "#222831",
                                            color: selectedOrder?.id === o.id ? "#f5f0e6" : "#c5c6c7",
                                            marginBottom: 4,
                                            borderRadius: 6,
                                            userSelect: "none",
                                        }}
                                        title={`Натисніть щоб редагувати замовлення №${o.id}`}
                                    >
                                        <strong>№{o.id}</strong> — {o.status} — {new Date(o.createdAt).toLocaleString()} — {o.total} грн — Товарів: {o.itemsCount}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {selectedOrder && (
                            <div style={{ marginTop: 20, backgroundColor: "#394a2a", padding: 12, borderRadius: 8 }}>
                                <h4>Замовлення №{selectedOrder.id}</h4>
                                <p><b>Статус:</b></p>
                                <select
                                    value={selectedOrder.status}
                                    onChange={handleStatusChange}
                                    disabled={statusUpdating}
                                    className="order-status-select" // можно добавить класс, чтобы проще стилизовать
                                >
                                    <option value="Очікує обробки">Очікує обробки</option>
                                    <option value="Виконано">Виконано</option>
                                    <option value="Відмінено">Відмінено</option>
                                </select>

                            </div>
                        )}
                    </section>


                    <section className="admin-box admin-right">
                        <ProductTable
                            products={filteredProducts}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    </section>
                </div>
            </div>

            {showModal && (
                <AddProductModal
                    onAdd={handleAddProduct}
                    onClose={() => setShowModal(false)}
                />
            )}

            {editProduct && (
                <EditProductModal
                    product={editProduct}
                    onUpdate={handleUpdateProduct}
                    onClose={() => setEditProduct(null)}
                />
            )}
        </div>
    );
};

export default AdminPanel;
