import React, { useState } from "react";
import bcrypt from "bcryptjs";

export default function AuthModal({ onClose, onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirm: ""
    });

    const handleSignup = async () => {
        if (!form.email.trim()) return alert("Email không được để trống!");
        if (!form.password.trim()) return alert("Mật khẩu không được để trống!");
        if (!form.confirm.trim()) return alert("Xác nhận mật khẩu không được để trống!");

        let users = JSON.parse(localStorage.getItem("youtube_app_users")) || [];

        const exist = users.find(u => u.email === form.email);
        if (exist) return alert("Email đã tồn tại!");

        if (form.password !== form.confirm)
            return alert("Mật khẩu không khớp!");

        // Băm mật khẩu trước khi lưu
        const hashedPassword = await bcrypt.hash(form.password, 10);

        users.push({
            email: form.email,
            password: hashedPassword,
            favorites: []
        });

        localStorage.setItem("youtube_app_users", JSON.stringify(users));
        alert("Đăng ký thành công!");
        setIsLogin(true);
        setForm({ email: "", password: "", confirm: "" });
    };

    const handleLogin = async () => {
        if (!form.email.trim()) return alert("Email không được để trống!");
        if (!form.password.trim()) return alert("Mật khẩu không được để trống!");

        let users = JSON.parse(localStorage.getItem("youtube_app_users")) || [];

        const user = users.find(u => u.email === form.email);

        if (!user) return alert("Email không tồn tại!");
        const isPasswordValid = await bcrypt.compare(form.password, user.password);

        if (!isPasswordValid) return alert("Mật khẩu sai!");

        localStorage.setItem("current_user", JSON.stringify(user));
        setForm({ email: "", password: "", confirm: "" });
        onLogin(user);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-80">
                <h2 className="text-xl font-bold mb-4">
                    {isLogin ? "Đăng nhập" : "Đăng ký"}
                </h2>

                <input
                    placeholder="Email"
                    className="w-full border p-2 mb-2"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-2"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })} />

                {!isLogin && (
                    <input
                        type="password"
                        placeholder="Confirm"
                        className="w-full border p-2 mb-2"
                        value={form.confirm}
                        onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
                )}

                <button
                    onClick={() => isLogin ? handleLogin() : handleSignup()}
                    className="bg-red-500 text-white w-full py-2"
                >
                    {isLogin ? "Login" : "Signup"}
                </button>

                <p onClick={() => {
                       setIsLogin(!isLogin);
                       setForm({ email: "", password: "", confirm: "" });
                   }}
                   className="text-blue-500 mt-2 cursor-pointer">
                    {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                </p>

                <button onClick={() => {
                    setForm({ email: "", password: "", confirm: "" });
                    setIsLogin(true);
                    onClose();
                }} className="mt-2">Đóng</button>
            </div>
        </div>
    );
}