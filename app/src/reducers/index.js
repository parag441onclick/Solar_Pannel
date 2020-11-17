import { combineReducers } from "redux";

import PageCheckReducer from "./SurveyReducer/PageCheckReducer";

const INITIAL_STATE = null;

const theDefaultReducer = (state = INITIAL_STATE, action) => state;

export default combineReducers({
  theDefaultReducer,
  checkedPageNo: PageCheckReducer,
});
