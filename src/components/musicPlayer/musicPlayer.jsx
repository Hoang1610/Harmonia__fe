import React, {
  use,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./musicPlayer.css";
import musicPlayerScript from "./musicplayerSctipt";
import karaokeScript from "./karaokeScript.js";
import axios from "../../../axios.js";
import { useDispatch, useSelector } from "react-redux";

export default function MusicPlayer({ songId }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [link, setLink] = useState(null);
  const { nextSong } = useSelector((state) => state.app);
  const [nextSongInfo, setNextSongInfo] = useState(null);
  const { isLoop, isPlay } = useSelector((state) => state.app);
  const [isKaraoke, setIskaraoke] = useState(false);
  const [dataLyric, setDataLyric] = useState(null);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const loopBtn = useRef(null);
  const { index } = useSelector((state) => state.app);
  useEffect(() => {
    if (audioRef.current) {
      function setAudio() {
        if (index < nextSongInfo.length) {
          dispatch({
            type: "setCurrentSong",
            payload: nextSongInfo[index].encodeId,
          });
          dispatch({
            type: "setIndexSong",
            payload: index + 1,
          });
          dispatch({
            type: "setIsPlay",
            payload: false,
          });
        } else {
          dispatch({
            type: "setIndexSong",
            payload: 0,
          });
          dispatch({
            type: "setCurrentSong",
            payload: nextSongInfo[0].encodeId,
          });
          dispatch({
            type: "setIsPlay",
            payload: false,
          });
        }
      }
      if (!isLoop) {
        audioRef.current.addEventListener("ended", setAudio);
        if (loopBtn.current) {
          loopBtn.current.removeAttribute("style");
        }
        return () => {
          try {
            audioRef.current.removeEventListener("ended", setAudio);
          } catch (error) {}
        };
      } else if (isLoop) {
        function setReplay() {
          if (audioRef.current) {
            let audio = audioRef.current;
            audio.currentTime = 0;
            audio.play();
          }
        }
        function setAudioLoop() {
          if (audioRef.current && loopBtn.current) {
            let audio = audioRef.current;
            let loopBtnAudio = loopBtn.current;
            loopBtnAudio.style.background =
              "linear-gradient(45deg, #e91e63, #9c27b0)";
            loopBtnAudio.style.backgroundClip = "text";
            loopBtnAudio.style.color = "transparent";
            audio.addEventListener("ended", setReplay);
          }
          return () => {
            try {
              audio.removeEventListener("ended", setReplay);
            } catch (error) {}
          };
        }
        const cleanUp = setAudioLoop();
        return () => {
          cleanUp();
        };
      }
    }
  }, [currentSong, isLoop]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios({
        method: "get",
        url: `/songInfo?id=${songId}`,
      });
      const link = await axios({
        method: "get",
        url: `/song?id=${songId}`,
      });
      const dataNextSong = await axios({
        method: "get",
        url: `/listSongArtist?id=${nextSong}`,
      });
      if (data.data.data.data && link.data.data.data) {
        setCurrentSong(data.data.data.data);
        setLink(link.data.data.data["128"]);
      }
      if (dataNextSong.data.data.data?.items) {
        let dataCheck = dataNextSong.data.data.data.items.filter(
          (item) => item.encodeId !== songId && !item.previewInfo
        );
        setNextSongInfo(dataCheck);
      }
    };
    fetchData();
  }, [songId]);
  useEffect(() => {
    if (currentSong) {
      const cleanUp = musicPlayerScript();
      return () => {
        cleanUp();
      };
    }
  }, [currentSong]);
  useEffect(() => {
    dispatch({
      type: "setIsPlay",
      payload: false,
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (isKaraoke && currentSong) {
        const dataApi = await axios({
          method: "get",
          url: `/lyric?idSong=${currentSong.encodeId}`,
        });
        if (dataApi.data.data.data.sentences) {
          setDataLyric(dataApi.data.data.data.sentences);
        } else {
          setDataLyric(null);
        }
      }
    };
    fetchData();
  }, [isKaraoke, currentSong]);
  useEffect(() => {
    if (dataLyric) {
      const cleanUp = karaokeScript(
        dataLyric,
        currentSong.title,
        currentSong.artists.map((item) => item.name).join(", ")
      );
      return () => {
        try {
          cleanUp();
        } catch (error) {}
      };
    } else {
      const karaoke = document.querySelector(".karaoke-content");
      if (karaoke) {
        karaoke.innerHTML = `<p>Karaoke đang cập nhật</p>`;
      }
    }
  }, [dataLyric]);
  return (
    <>
      {currentSong && link && (
        <div>
          <audio ref={audioRef} src={link} id="audio"></audio>
          <div className="music-player" id="musicPlayer">
            <div className="left-section">
              <img
                src={currentSong.thumbnailM}
                className="track-img"
                alt={currentSong.title}
              />
              <div className="track-info">
                <div className="track-title">{currentSong.title}</div>
                <div className="track-artist">
                  {currentSong.artists &&
                    currentSong.artists.map((item) => item.name).join(", ")}
                </div>
              </div>
              <button className="add-btn">
                <i className="fa-regular fa-heart" />
              </button>
            </div>
            <div className="center-section">
              <div className="control-buttons">
                <div
                  onClick={() => {
                    dispatch({
                      type: "setIsLoop",
                      payload: !isLoop,
                    });
                  }}
                >
                  <i className="fa-solid fa-shuffle loop-btn" ref={loopBtn} />
                </div>
                <div
                  className="control-wrap"
                  onClick={() => {
                    if (index > 0) {
                      dispatch({
                        type: "setCurrentSong",
                        payload: nextSongInfo[index - 1].encodeId,
                      });
                      dispatch({
                        type: "setIndexSong",
                        payload: index - 1,
                      });
                      dispatch({
                        type: "setIsPlay",
                        payload: false,
                      });
                      dispatch({
                        type: "setIsLoop",
                        payload: false,
                      });
                    }
                  }}
                >
                  <i
                    className="fa-solid fa-backward-step"
                    style={index == 0 ? { cursor: "not-allowed" } : {}}
                  />
                </div>
                <button
                  className="play-btn btn"
                  onClick={() =>
                    dispatch({
                      type: "setIsPlay",
                      payload: !isPlay,
                    })
                  }
                >
                  {isPlay ? (
                    <i className="fa-solid fa-play"></i>
                  ) : (
                    <i className="fa-solid fa-pause"></i>
                  )}
                </button>
                <div
                  className="control-wrap"
                  onClick={() => {
                    if (index < nextSongInfo.length) {
                      dispatch({
                        type: "setCurrentSong",
                        payload: nextSongInfo[index].encodeId,
                      });
                      dispatch({
                        type: "setIndexSong",
                        payload: index + 1,
                      });
                      dispatch({
                        type: "setIsPlay",
                        payload: false,
                      });
                      dispatch({
                        type: "setIsLoop",
                        payload: false,
                      });
                    }
                  }}
                >
                  <i
                    className="fa-solid fa-forward-step"
                    style={
                      index + 1 > nextSongInfo?.length
                        ? { cursor: "not-allowed" }
                        : {}
                    }
                  />
                  {nextSongInfo && nextSongInfo[index]?.thumbnailM && (
                    <div className="next-song">
                      <p className="next-song-label">Phát tiếp theo</p>
                      <div className="next-song-wrap">
                        <img
                          src={nextSongInfo[index].thumbnailM}
                          alt=""
                          className="next-song-img"
                        />
                        <div className="next-song-info">
                          <h4 className="next-song-title">
                            {nextSongInfo[index].title}
                          </h4>
                          <p className="next-song-desc">
                            {nextSongInfo[index].artists
                              .map((item) => item.name)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="triangle-up"></div>
                    </div>
                  )}
                </div>
                <i className="fa-regular fa-message" />
              </div>
              <div className="progress-wrapper">
                <span className="current-time">0:00</span>
                <div className="progress-bar">
                  <div className="progress"></div>
                </div>
                <span className="duration">3:39</span>
              </div>
            </div>
            <div className="right-section">
              <i className="fa-solid fa-desktop" />
              <i
                className="fa-solid fa-microphone"
                style={!currentSong.hasLyric ? { cursor: "not-allowed" } : {}}
                onClick={() => {
                  if (currentSong.hasLyric) setIskaraoke(true);
                }}
              />
              <i className="fa-solid fa-bars" />
              <i className="fa-solid fa-volume-low" />
              <input
                type="range"
                className="volume-bar"
                defaultValue={50}
                max={100}
              />
              <i className="fa-solid fa-tv" />
              <i className="fa-solid fa-expand" />
            </div>
          </div>
          <div className={`karaoke ${isKaraoke && "show"}`}>
            <div className="karaoke-heading">
              <h2>Karaoke</h2>
              <span
                className="karaoke-close"
                onClick={() => setIskaraoke(false)}
              >
                <i className="fa-solid fa-angle-down"></i>
              </span>
            </div>
            <div className="karaoke-content">
              <p>karaoke đang cập nhật</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
