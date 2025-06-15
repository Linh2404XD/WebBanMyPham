import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    const getProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Bạn chưa đăng nhập");
        }

        const response = await axios.get("http://localhost:8080/api/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    };

    useEffect(() => {
        getProfile()
            .then((data) => setUser(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <div>{error}</div>;
    if (!user) return <div>Đang tải...</div>;

    return (
        <div>
            <h2>Thông tin cá nhân</h2>
            <p>Full name: {user.fullName}</p>
            <p>Username: {user.username}</p>
            <p>Phone: {user.phoneNumber}</p>
            <p>Address: {user.address}</p>
            <p>Roles: {user.roles?.join(", ")}</p>
        </div>
    );
};

export default Profile;
