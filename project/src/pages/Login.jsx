import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import "../css/Login.css";
import banner from "../assets/testBG.jpg";
import Loader from "../components/Loader";

const API = import.meta.env.VITE_API_URL;

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${API}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok || !data.token) {
                throw new Error(data.message || "Невірний email або пароль");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 2000);

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-banner">
                <img src={banner} alt="Banner" />
                <div className="banner-text">
                    <h1>Ласкаво просимо!</h1>
                    <p>Увійдіть до свого акаунту або створіть новий</p>
                </div>
            </div>

            <div className="login-content-wrapper">
                <div className="login-content">
                    <div className="login-left">
                        <h2>Ще не маєте акаунту?</h2>
                        <p>Зареєструйтесь, щоб отримати повний доступ до замовлень, історії та профілю.</p>
                        <Link to="/register" className="register-button">Зареєструватися</Link>
                    </div>

                    <div className="login-divider" />

                    {loading ? (
                        <div className="login-loader-wrapper">
                            <Loader />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="login-form">
                            <h2>Вхід</h2>

                            {error && <p className="login-error">{error}</p>}

                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                            <input
                                name="password"
                                type="password"
                                placeholder="Пароль"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />

                            <button type="submit">Увійти</button>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Login;
