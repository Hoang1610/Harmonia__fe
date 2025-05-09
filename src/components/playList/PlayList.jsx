import { Link } from "react-router-dom";
import "./PlayList.css";
export default function PlayList({ data }) {
  let index = 0;
  return (
    <>
      <div className="play-list-wrap" style={{ marginTop: "30px" }}>
        {data &&
          data.items.map((item) => {
            if (index > 4) return;
            index++;
            return (
              <div key={item.encodeId} className="play-list-item">
                <Link to={item.link}>
                  <img src={item.thumbnailM} alt="" className="play-list-img" />
                </Link>
                <p className="play-list-desc">{item.sortDescription}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}
