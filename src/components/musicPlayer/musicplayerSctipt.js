function musicPlayerScript() {
  let ismouse = false;
  let startMouse;
  let value;
  const progressBar = document.querySelector(".progress-bar");
  const progress = document.querySelector(".progress");
  const playBtn = document.querySelector(".play-btn");
  const loopBtn = document.querySelector(".loop-btn");
  let progressBarWidth = progressBar.clientWidth;
  let audio = document.getElementById("audio");
  const currentTime = document.querySelector(".current-time");
  const duration = document.querySelector(".duration");
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
  function audioTimeUpdate() {
    currentTime.innerText = getTime(audio.currentTime);
    if (!ismouse) {
      value = (audio.currentTime / audio.duration) * 100;
      progress.style.width = `${value}%`;
    }
  }
  function playAudioBtn() {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  function playAudio() {
    duration.innerText = getTime(audio.duration);
    audio.play();
    audio.addEventListener("timeupdate", audioTimeUpdate);
    playBtn.addEventListener("click", playAudioBtn);
    progressBar.addEventListener("mousedown", (e) => {
      ismouse = true;
      startMouse = e.clientX;
      let progressWidth = e.offsetX;
      value = (progressWidth / progressBarWidth) * 100;
      progress.style.width = `${value}%`;
    });
    document.addEventListener("mousemove", (e) => {
      if (ismouse) {
        let mouseWidth = e.clientX - startMouse;
        value += (mouseWidth / progressBarWidth) * 100;
        startMouse = e.clientX;
        if (value < 0) {
          value = 0;
        }
        if (value > 100) {
          value = 100;
        }
        progress.style.width = `${value}%`;
      }
    });
    document.addEventListener("mouseup", (e) => {
      if (ismouse) {
        ismouse = false;
        progress.style.width = `${value}%`;
        audio.currentTime = (value / 100) * audio.duration;
      }
    });
  }
  audio.addEventListener("loadeddata", playAudio);
  return () => {
    audio.removeEventListener("loadeddata", playAudio);
    audio.removeEventListener("timeupdate", audioTimeUpdate);
    playBtn.removeEventListener("click", playAudioBtn);
  };
}
export default musicPlayerScript;
