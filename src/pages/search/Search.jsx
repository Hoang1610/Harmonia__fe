import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../../axios.js";
import "./search.css";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Search() {
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const key = searchParams.get("key");
  const dispatch = useDispatch();
  let num = 0;
  useEffect(() => {
    const fetchData = async () => {
      const dataApi = await axios({
        method: "get",
        url: `/searchSong?key=${key}`,
      });
      setData(dataApi.data.data.data);
    };
    fetchData();
  }, [key]);
  return (
    <>
      {data && (
        <div className="main-content">
          <div className="search">
            <h1 className="search-title">Kết quả tìm kiếm</h1>
            <div className="search-top">
              <h2 className="search-top-title" style={{ marginTop: "20px" }}>
                Nổi bật
              </h2>
              <div className="search-top-list">
                <div
                  className="search-top-item"
                  onClick={() => {
                    dispatch({
                      type: "setCurrentSong",
                      payload: data.songs[0].encodeId,
                    });
                    if (data.song && data.songs[0].artists[0].id) {
                      dispatch({
                        type: "setNextSong",
                        payload: data.songs[0].artists[0].id,
                      });
                    }
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
                >
                  <img
                    src={data.songs[0].thumbnailM}
                    alt=""
                    className="search-top-img"
                  />
                  <div className="search-top-info">
                    <p className="search-top-sub">Bài hát</p>
                    <h3 className="search-top-name">{data.songs[0].title}</h3>
                    <p className="search-top-desc">
                      {data.song &&
                        data.song[0].artists &&
                        data.songs[0].artists
                          .map((item) => item.name)
                          .join(", ")}
                    </p>
                  </div>
                </div>
                <div
                  className="search-top-item"
                  onClick={() => {
                    dispatch({
                      type: "setCurrentSong",
                      payload: data.songs[1].encodeId,
                    });
                    dispatch({
                      type: "setNextSong",
                      payload: data.songs[1].artists[0].id,
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
                >
                  <img
                    src={data.songs[1].thumbnailM}
                    alt=""
                    className="search-top-img"
                  />
                  <div className="search-top-info">
                    <p className="search-top-sub">Bài hát</p>
                    <h3 className="search-top-name">{data.songs[1].title}</h3>
                    <p className="search-top-desc">
                      {data.song &&
                        data.songs[1].artists
                          .map((item) => item.name)
                          .join(", ")}
                    </p>
                  </div>
                </div>
                {data?.artists && data.artists[0] && (
                  <div
                    className="search-top-item"
                    onClick={() => {
                      navigate(`/artist${data.artists[0].link}`);
                    }}
                  >
                    <img
                      src={data.artists[0].thumbnailM}
                      alt=""
                      className="search-top-img"
                    />
                    <div className="search-top-info">
                      <p className="search-top-sub">Nghệ sĩ</p>
                      <h3 className="search-top-name">
                        {data.artists[0].name}
                      </h3>
                      <p className="search-top-desc">
                        {data.artists[0].artistsNames}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="search-song" style={{ marginTop: "20px" }}>
              <h2 className="search-top-title">Bài hát</h2>

              <div className="music-grid">
                {data.songs &&
                  data.songs.map((item) => {
                    if (num > 8) return;
                    if (!item.previewInfo) {
                      num++;
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
                          className="music-card-link"
                        >
                          <div className="music-card">
                            <img src={item.thumbnailM} alt="" />
                            <div>
                              <h4>{item.title}</h4>
                              <p>
                                {item.artists && item.artists.length > 0
                                  ? item.artists
                                      .map((item) => item.name)
                                      .join(", ")
                                  : item.artists?.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
