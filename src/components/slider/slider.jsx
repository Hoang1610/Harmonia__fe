import { ConfigProvider, Spin } from "antd";
import { Segmented } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
export default function Slider({ data }) {
  const [mode, setMode] = useState("all");
  let num = 0;
  const dispatch = useDispatch();
  return (
    <>
      {data ? (
        <section className="music-section">
          <h2>Bài hát mới nhất</h2>
          <ConfigProvider
            theme={{
              components: {
                Segmented: {
                  //   itemColor: "#fff",
                  //   trackBg: "#000",
                  itemHoverBg: "rgba(158, 13, 131, 0.72)",
                  //   itemSelectedColor: "#ccc",
                  //   itemHoverColor: "#ccc",
                  itemSelectedBg: "rgba(158, 13, 131, 0.72)",
                  trackPadding: "10",
                },
              },
            }}
          >
            <Segmented
              options={["Tất cả", "Việt Nam", "Quốc tế"]}
              onChange={(value) => {
                if (value === "Tất cả") {
                  setMode("all");
                } else if (value === "Việt Nam") {
                  setMode("vPop");
                } else if (value === "Quốc tế") {
                  setMode("others");
                }
              }}
            />
          </ConfigProvider>

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
      )}
    </>
  );
}
