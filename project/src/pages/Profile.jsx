import React, { useState } from "react";
import "../css/Profile.css";
import profileBg from "../assets/BGProf.jpg";
import { FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        navigate("/");
    };

    const handleAdminPanel = () => {
        if (user?.role === "admin") {
            navigate("/admin54");
        }
    };

    if (!user) {
        return <div className="profile-error">Користувач не знайдений.</div>;
    }

    return (
        <div className="profile-page" style={{ backgroundImage: `url(${profileBg})` }}>

            <div className="profile-avatar-wrapper">
                <div className="profile-avatar">
                    {user.name[0].toUpperCase()}
                </div>
            </div>


            <div className="profile-info">
                <p><strong>Ім’я:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>

                <div className="profile-buttons">
                    <button onClick={() => navigate("/orders")}>Історія замовлень</button>
                    <button onClick={handleLogout}>Вийти</button>
                </div>
            </div>

            {user.role === "admin" && (
                <div
                    className="admin-icon-bottom"
                    onClick={handleAdminPanel}
                    title="Адмін-панель"
                >
                    <FaUserShield />
                </div>
            )}
        </div>
    );
};

export default Profile;
