import "./PlayListPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../axios.js";
import { useDispatch } from "react-redux";
const getTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${minutes}:${seconds}`;
};
export default function PlayListPage() {
  let { id } = useParams();
  id = id.slice(0, -5);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const dataApi = await axios({
        method: "get",
        url: `/detailPlayList?id=${id}`,
      });
      setData(dataApi.data.data.data);
    };
    fetchData();
  }, []);
  return (
    <>
      {data && (
        <div className="main-content">
          <div className="play-list-page">
            <div className="play-list-page-info">
              <img src={data.thumbnail} alt="" className="play-list-page-img" />
              <h1 className="play-list-page-title">{data.title}</h1>
              <i className="fa-solid fa-heart"></i>
            </div>
            <div className="play-list-grid">
              {data.song.items.map((item) => {
                if (item.previewInfo) return;
                return (
                  <div
                    key={item.encodeId}
                    onClick={() => {
                      dispatch({
                        type: "setCurrentSong",
                        payload: item.encodeId,
                      });
                      dispatch({
                        type: "setNextSong",
                        payload: item.artists[0].id,
                      });
                      dispatch({
                        type: "setIndexSong",
                        payload: 0,
                      });
                      dispatch({
                        type: "setIsPlay",
                        payload: false,
                      });
                      dispatch({
                        type: "setIsLoop",
                        payload: false,
                      });
                    }}
                    className="top-chart-item"
                  >
                    <div className="top-chart-songInfo">
                      <img
                        src={item.thumbnailM}
                        alt=""
                        className="top-chart-img"
                      />
                    </div>
                    <div className="top-chart-songInfo-wrap">
                      <h3 className="top-chart-songName">{item.title}</h3>
                      <p className="top-chart-artistName">
                        {item.artists.map((item) => item.name).join(", ")}
                      </p>
                    </div>
                    <span>{getTime(item.duration)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
