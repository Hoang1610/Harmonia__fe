import { useEffect } from "react";
import "./Sidebar.css";
import { sidebarfunc } from "./sidebarfunc.js";
import { Link } from "react-router-dom";
export default function Sidebar() {
  useEffect(() => {
    sidebarfunc();
  }, []);
  return (
    <div>
      <div className="sidebar-toggle">
        <i id="toggle-icon" className="fa-solid fa-book-open" />
      </div>
      <aside className="main-sidebar">
        <nav>
          <ul className="sidebar-menu">
            <li>
              <Link to="/top100" className="library-btn">
                <i className="fa-solid fa-music" />
                <span>Top 100</span>
              </Link>
            </li>
            {/* <li>
              <a href="/pages/playlist.html" className="playlist-btn">
                <i className="fa-solid fa-list" />
                <span>Playlist cá nhân</span>
              </a>
            </li> */}
            <li>
              <a href="/pages/favourite.html" className="favourite-btn">
                <i className="fa-solid fa-heart" />
                <span>Yêu thích</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
