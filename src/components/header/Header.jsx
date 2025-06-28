import React, { useEffect } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import setupAvatarDropdown from "./headerScript";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
export default function Header({ searchKey }) {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/search?key=${e.target[0].value}`);
  };
  useEffect(() => {
    setupAvatarDropdown();
  }, []);
  const user = useSelector((state) => state.app.token);
  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="logo">
          <img src="../../img/logo.png" alt="Harmonia Logo" />
          <span>Harmonia</span>
        </Link>
      </div>
      <div className="header-center">
        <Link to="/" className="home-btn">
          <i className="fa-solid fa-house" />
        </Link>
        <form method="get" className="search-box" onSubmit={handleSubmit}>
          <i className="fa-solid fa-magnifying-glass" />
          <input
            type="text"
            placeholder="Tìm kiếm bài hát, nghệ sĩ..."
            name="key"
            defaultValue={searchKey && searchKey}
          />
        </form>
      </div>
      <div className="header-right">
        <a href="/pages/premium.html" className="premium-btn-link">
          <button className="premium-btn">Nâng cấp Premium</button>
        </a>
        <button className="notify-btn">
          <i className="fa-solid fa-bell" />
        </button>
        <div className="user-avatar">
          {user.name === "" ? (
            <>
              <img
                className="avatar-img"
                src="../../img/avatar.jpg"
                alt="Avatar"
              />
              <ul className="dropdown">
                <li>
                  <Link to="/login">Đăng nhập</Link>
                </li>
                <li>
                  <Link to="/register">Đăng ký</Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <Avatar
                style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
                size="large"
              >
                {user.name.split(" ")[user.name.split(" ").length - 1]}
              </Avatar>
              <ul className="dropdown">
                <li>
                  <Link to="/login">Đăng xuất</Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
