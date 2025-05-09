import { useDispatch, useSelector } from "react-redux";
import "./topchart.css";
import { ConfigProvider, Segmented } from "antd";
import { useEffect, useState } from "react";
import axios from "../../../axios.js";
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
export default function Topchart() {
  const [mode, setMode] = useState("vn");
  const [data, setData] = useState([]);
  let indexTopChart = 0;
  useEffect(() => {
    const fetchData = async () => {
      const api = await axios({
        method: "get",
        url: "/chartHome",
      });
      setData(api.data.data.data.weekChart);
    };
    fetchData();
  }, []);
  const dispatch = useDispatch();
  return (
    <>
      <div className="main-content">
        <h1 style={{ marginBottom: "20px" }}>Bảng xếp hạng tuần</h1>
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
            options={["Việt Nam", "US-UK", "KPOP"]}
            onChange={(value) => {
              if (value === "Việt Nam") {
                setMode("vn");
              } else if (value === "US-UK") {
                setMode("us");
              } else if (value === "KPOP") {
                setMode("korea");
              }
            }}
          />
        </ConfigProvider>
        <div className="top-chart-gird">
          {data[mode] &&
            data[mode].items.map((item) => {
              if (indexTopChart > 8 || item.previewInfo) return;
              indexTopChart++;
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
                  <i className={"fa-solid fa-" + indexTopChart}></i>
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
    </>
  );
}
