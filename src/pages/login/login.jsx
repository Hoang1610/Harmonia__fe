import { Link } from "react-router-dom";
// import "./login.css";
export default function Login() {
  return (
    <body className="form">
      <div className="form-container">
        <h2>Đăng nhập</h2>
        <form>
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Mật khẩu"
            name="password"
            required
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
