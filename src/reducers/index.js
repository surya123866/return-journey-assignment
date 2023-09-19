import { combineReducers } from "redux";
import gameReducer from "./reducer";

const rootReducer = combineReducers({
  gameReducer,
});

export default rootReducer;
