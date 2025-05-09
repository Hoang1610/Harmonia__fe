function karaokeScript(dataLyric, title, artists) {
  let currentSceen;
  let cleanUp;
  let audio = document.getElementById("audio");
  const karaokeUpdate = () => {
    cleanUp = setInterval(() => {
      if (!audio.paused) {
        let karaokeContent = document.querySelector(".karaoke-content");
        let currentTime = audio.currentTime * 1000;
        let index = dataLyric.findIndex((sentence) => {
          sentence = sentence.words;
          return (
            currentTime >= sentence[0].startTime &&
            currentTime <= sentence[sentence.length - 1].endTime
          );
        });
        let firstTime = dataLyric[0].words[0].startTime;
        if (currentTime - firstTime < -5000) {
          karaokeContent.innerHTML = `<p>${title}</p><p>${artists}</p>`;
        }
        if (currentTime - firstTime > -5000 && currentTime - firstTime < 0) {
          index = 0;
        }
        if (index === -1 && currentTime >= firstTime) index + 1;
        if (index !== -1) {
          let screen = Math.floor(index / 2 + 1);
          let offset = Math.floor((screen - 1) * 2);

          if (screen !== currentSceen) {
            let pTag = "";
            for (let i = offset; i < offset + 2; i++) {
              let sentence = dataLyric[i].words
                .map(
                  (item) =>
                    `<span data-start-time="${item.startTime}" data-end-time="${item.endTime}">${item.data}<span>${item.data}</span></span>`
                )
                .join(" ");
              pTag += `<p>${sentence}</p>`;
            }
            karaokeContent.innerHTML = pTag;
            currentSceen = screen;
          }
          let karaokeLyric = document.querySelectorAll(".karaoke p");
          let sentenceEl = karaokeLyric[index % 2].children;
          Array.from(sentenceEl).forEach((item) => {
            let startTime = item.dataset.startTime;
            let endTime = item.dataset.endTime;
            if (currentTime >= startTime) {
              let time = endTime - startTime;
              item.children[0].style.transition = `width ${time}ms ease`;
              item.children[0].style.width = "100%";
            }
          });
        }
      }
    }, 16);
  };

  karaokeUpdate();
  // audio.addEventListener("play", karaokeUpdate);
  // audio.addEventListener("pause", clear);
  // audio.addEventListener("ended", clear);
  return () => {
    try {
      clearInterval(cleanUp);
      // audio.addEventListener("play", karaokeUpdate);
      // audio.removeEventListener("pause", clear);
      // audio.removeEventListener("ended", clear);
    } catch (error) {}
  };
}
export default karaokeScript;
