import React, { useEffect, useState } from "react";
import "../css/order.css";


const API_BASE = "http://localhost:5214";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE}/api/orders/my`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
        .then(res => {
          if (!res.ok) throw new Error("Не вдалось завантажити замовлення");
          return res.json();
        })
        .then(data => setOrders(data))
        .catch(err => alert(err.message))
        .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Завантаження...</div>;
  if (orders.length === 0) return <div className="no-orders">Замовлень немає</div>;

  return (
      <div className="orders-container">
        <h2 className="orders-title">Історія замовлень</h2>
        <ul className="orders-list">
          {orders.map(o => (
              <li key={o.id} className="order-item">
                <div className="order-header">
                  <span className="order-id">№{o.id}</span>
                  <span className={`order-status status-${o.status.toLowerCase().replace(/\s/g, '-')}`}>
                {o.status}
              </span>
                </div>
                <div className="order-details">
                  <span className="order-date">{new Date(o.createdAt).toLocaleString()}</span>
                  <span className="order-total">Сума: <strong>{o.total.toFixed(2)} грн</strong></span>
                  <span className="order-items-count">Товарів: {o.itemsCount}</span>
                </div>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default Orders;
