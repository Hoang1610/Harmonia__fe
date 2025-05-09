import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/home";
import "./index.css";
import Topchart from "./pages/TopChart/Topchart";
import PlayListPage from "./pages/playListPage/PlayListPage";
import Search from "./pages/search/Search";
import Artists from "./pages/artists/Artists";
import MusicPlayer from "./components/musicPlayer/musicPlayer";
import { useSelector } from "react-redux";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import TopPage from "./pages/topPage/TopPage";
import Register from "./pages/register/Register";
import Login from "./pages/login/login";
function App() {
  const currentSong = useSelector((state) => state.app.currentSong);
  const location = useLocation();
  const hideLayout = location.pathname === ("/register" || "/login");
  return (
    <>
      {!hideLayout && <Header />}
      {!hideLayout && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="/topChartTuan" element={<Topchart />} />
        <Route path="/album/:title/:id" element={<PlayListPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/artist/:name" element={<Artists />} />
        <Route path="/top100" element={<TopPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {!hideLayout && <MusicPlayer songId={currentSong} />}
    </>
  );
}

export default App;
