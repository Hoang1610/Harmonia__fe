import { notification, Spin } from "antd";
import axios from "../../../axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SongLike() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/songLike");
      console.log(res);
      if (res.message) {
        notification.error({
          message: res.message,
          description: "Bạn vui lòng đăng nhập để xem mục yêu thích",
        });
        navigate("/login");
      }
      else{
        
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {/* {data ? (
        <section className="music-section">
          <h2>Bài hát đã thích</h2>
          <div className="music-grid">
            {data?.items[mode] &&
              data.items[mode].map((item, index) => {
                if (num > 11) return;
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
                        <img src={item.thumbnailM} alt="Đây là Việt Nam" />
                        <div>
                          <h4>{item.title}</h4>
                          <p>
                            {item.artists.length > 0
                              ? item.artists.map((item) => item.name).join(", ")
                              : item.artists.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </section>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Spin size="large" />
        </div>
      )} */}
      <h2>SOng like</h2>
    </>
  );
}
