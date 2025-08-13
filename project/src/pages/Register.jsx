import React, { useState } from "react";
import "../css/Register.css";
import banner from "../assets/testBG2.jpg";
import Loader from "../components/Loader";

const API = import.meta.env.VITE_API_URL;

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${API}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                let message = "Помилка реєстрації";
                try {
                    const err = await res.json();
                    message = err.message || message;
                } catch {}
                throw new Error(message);
            }

            const data = await res.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-banner">
                <img src={banner} alt="Register Banner" />
                <div className="register-banner-text">
                    <h1>Створіть акаунт</h1>
                    <p>Щоб розпочати подорож зі смаками</p>
                </div>
            </div>

            <div className="register-content-wrapper">
                <div className="register-content">
                    <div className="register-left">
                        <h2>Переваги реєстрації</h2>
                        <p>
                            Маючи акаунт, ви зможете зберігати замовлення,
                            бачити історію покупок та отримувати персональні
                            рекомендації.<br/>
                            Ваша чайна подорож починається тут 🌿
                        </p>
                        <div className="register-bottom">
                            <br/>
                            <p className="register-bottom-text">Вже є акаунт?</p>
                            <button onClick={() => (window.location.href = "/login")} className="register-login-button">
                                Увійти
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="login-loader-wrapper">
                            <Loader />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="register-form">
                            <h2>Реєстрація</h2>
                            {error && <p className="register-error">{error}</p>}
                            <input
                                name="name"
                                type="text"
                                placeholder="Ім'я"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
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
                            <button type="submit">Зареєструватися</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
