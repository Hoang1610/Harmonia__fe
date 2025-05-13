import { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../axios.js";
import { notification } from "antd";
const initialForm = {
  name: "",
  email: "",
  pass: "",
  passCompare: "",
};
export default function Register() {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let { email, name, pass, passCompare } = form;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      notification.error({
        message: "Lỗi",
        description: "Email không đúng định dạng",
      });
      return;
    }
    if (pass !== passCompare) {
      notification.error({
        message: "Lỗi",
        description: "Mật khẩu nhập không khớp",
      });
      return;
    } else {
      let data = { name, email, pass };
      const res = await axios.post("/register", data);
      if (res) {
        notification.success({
          message: "Đăng Ký",
          description: "Thành công",
        });
        navigate("/");
      }
    }
  };
  return (
    <body className="form">
      <div className="form-container">
        <h2>Đăng ký tài khoản</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Họ và tên"
            name="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            name="pass"
            required
            value={form.pass}
            onChange={(e) => setForm({ ...form, pass: e.target.value })}
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            name="confirmPassword"
            required
            value={form.passCompare}
            onChange={(e) => setForm({ ...form, passCompare: e.target.value })}
          />
          <button type="submit">Đăng ký</button>
        </form>
        <p className="redirect">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </body>
  );
}
