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
      console.log(data.data.data.data.items);
      dispatch({
        type: "fetchHome",
        payload: data.data.data.data.items,
      });
    };
    fetchData();
  }, []);
  const data = useSelector((state) => state.app.homeData);
  const dataSlier = data.find((item) => item.sectionType === "new-release");
  const dataPlayList = data.find(
    (item) => (item.sectionType === "playlist" && item.title) === "Chill"
  );
  return (
    <>
      <div className="main-content">
        <CarouselComponents data={data} />
        <Slider data={dataSlier} />
        <h2>{dataPlayList?.title}</h2>
        <PlayList data={dataPlayList} />
      </div>
    </>
  );
}
