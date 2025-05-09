import React, { useEffect, useState } from "react";
import PlayList from "../../components/playList/PlayList";
import axios from "../../../axios.js";

export default function TopPage() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const dataApi = await axios({
        method: "get",
        url: "/top100",
      });
      setData(dataApi.data.data.data);
    };
    fetchData();
  }, []);
  return (
    <div className="main-content">
      {data &&
        data.map((item) => (
          <>
            <h2>{item.title}</h2>
            <PlayList data={item} />
          </>
        ))}
    </div>
  );
}
