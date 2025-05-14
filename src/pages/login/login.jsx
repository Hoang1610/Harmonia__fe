import { message, notification } from "antd";
import axios from "../../../axios.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
let initialForm = {
  email: "",
  pass: "",
};
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await axios.post("/login", form);
    setForm(initialForm);
    console.log(res);
    if (res.data && res.data.accessToken) {
      localStorage.setItem("accessToken", res.data.accessToken);
      notification.success({
        message: "Đăng nhập",
        description: "Thành công",
      });
      console.log(res);
      // dispatch({

      // })
      navigate("/");
    } else {
      notification.error({
        message: "Lỗi",
        description: "Sai email hoặc mật khẩu",
      });
    }
  };
  return (
    <body className="form">
      <div className="form-container">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Đăng nhập</button>
        </form>
        <p className="redirect">
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </div>
    </body>
  );
}
