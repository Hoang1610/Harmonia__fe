import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export default function CarouselComponents({ data }) {
  const navigate = useNavigate();
  console.log(data);
  return (
    <Carousel autoplay arrows>
      <div>
        {data.length > 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              userSelect: "none",
            }}
          >
            <img
              src={
                data[3].banner !== undefined ? data[3].banner : data[4].banner
              }
              onClick={() => navigate("/topChartTuan")}
              style={{
                objectFit: "contain",
                height: "160px",
                cursor: "pointer",
              }}
            />
          </div>
        ) : (
          <h3 style={contentStyle}>1</h3>
        )}
      </div>
      <div>
        {data.length > 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              userSelect: "none",
            }}
          >
            <img
              src={
                data[5]?.items[0]?.banner !== undefined
                  ? data[5].items[0].banner
                  : data[6].items[0].banner
              }
              onClick={() => navigate("/topChartTuan")}
              style={{
                objectFit: "contain",
                height: "160px",
                cursor: "pointer",
              }}
            />
          </div>
        ) : (
          <h3 style={contentStyle}>2</h3>
        )}
      </div>
      <div>
        {data.length > 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              userSelect: "none",
            }}
          >
            <img
              src={
                data[5]?.items[1]?.banner !== undefined
                  ? data[5].items[1].banner
                  : data[6].items[1].banner
              }
              onClick={() => navigate("/topChartTuan")}
              style={{
                objectFit: "contain",
                height: "160px",
                cursor: "pointer",
              }}
            />
          </div>
        ) : (
          <h3 style={contentStyle}>3</h3>
        )}
      </div>
      <div>
        {data.length > 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              userSelect: "none",
            }}
          >
            <img
              onClick={() => navigate("/topChartTuan")}
              src={
                data[5]?.items[2]?.banner !== undefined
                  ? data[5].items[2].banner
                  : data[6].items[2].banner
              }
              style={{
                objectFit: "contain",
                height: "160px",
                cursor: "pointer",
              }}
            />
          </div>
        ) : (
          <h3 style={contentStyle}>4</h3>
        )}
      </div>
    </Carousel>
  );
}
