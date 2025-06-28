import React, { use, useEffect, useState } from "react";
import axios from "../../../axios.js";
import { useSelector, useDispatch } from "react-redux";
import CarouselComponents from "../../components/carousels/CarouselComponents.jsx";
import "./home.css";
import Slider from "../../components/slider/slider.jsx";
import PlayList from "../../components/playList/PlayList.jsx";
export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios({
        method: "get",
        url: "/home",
      });
      dispatch({
        type: "fetchHome",
        payload: data.data.data.data.items,
      });
    };
    fetchData();
  }, []);
  const data = useSelector((state) => state.app.homeData);
  const user = useSelector((state) => state.app.token);
  return (
    <>
      <div className="main-content">
        <CarouselComponents data={data} />
        <Slider
          data={
            data.length > 0 && data[2].items !== undefined ? data[2] : data[3]
          }
        />
        <h2>{data[8].title}</h2>
        <PlayList
          data={
            data.length > 0 && data[8].sectionType === "playlist"
              ? data[8]
              : data[2]
          }
        />
      </div>
    </>
  );
}
