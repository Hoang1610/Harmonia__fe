import actionType from "../action/appAction";
const initalState = {
  homeData: [],
  currentSong: null,
  nextSong: null,
  recentSong: null,
  index: 0,
  isPlay: false,
  isLoop: false,
  token: {
    name: "",
    email: "",
    songLike: [],
  },
};
const appReducer = (state = initalState, action) => {
  switch (action.type) {
    case actionType.type:
      return state;
    case "fetchHome":
      return { ...state, homeData: action.payload };
    case "setCurrentSong":
      return { ...state, currentSong: action.payload };
    case "setNextSong":
      return { ...state, nextSong: action.payload };
    case "setRecentSong":
      return { ...state, recentSong: action.payload };
    case "setIndexSong":
      return { ...state, index: action.payload };
    case "setIsPlay":
      return { ...state, isPlay: action.payload };
    case "setIsLoop":
      return { ...state, isLoop: action.payload };
    case "setToken":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};
export default appReducer;
