import { PAGE_NUMBER } from "../../actions/types";

const INITIAL_STATE = 0;

export default (state = INITIAL_STATE, action) => {
  if (action.type === PAGE_NUMBER) {
    return action.payload;
  }

  return state;
};
