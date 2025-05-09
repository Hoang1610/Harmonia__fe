import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./artist.css";
import axios from "../../../axios.js";

export default function Artists() {
  const [data, setData] = useState(null);
  const { name } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const dataApi = await axios({
        method: "get",
        url: `/artist?name=${name}`,
      });
      setData(dataApi.data.data.data);
    };
    fetchData();
  }, []);
  return (
    <>
      {data && (
        <div className="main-content">
          <div className="artist">
            <div className="artist-info">
              <img src={data.thumbnailM} alt="" className="artist-img" />
              <p className="artist-name">{data.name}</p>
            </div>
            <div className="artist-song">
              <h3 className="artist-song-title" style={{ padding: "10px 0" }}>
                Bài hát nổi bật
              </h3>
              <div className="music-grid">
                {data.sections &&
                  data.sections[0].items.map((item) => {
                    if (!item.previewInfo) {
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
                            <img src={item.thumbnailM} alt="Đây là Việt Nam" />
                            <div>
                              <h4>{item.title}</h4>
                              <p>
                                {item.artists.length > 0
                                  ? item.artists
                                      .map((item) => item.name)
                                      .join(", ")
                                  : item.artists.name}
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
