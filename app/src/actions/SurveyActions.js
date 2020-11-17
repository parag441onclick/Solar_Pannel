import { PAGE_NUMBER } from "./types";

export const pageNumberCheck = (val) => {
  return {
    type: PAGE_NUMBER,
    payload: val,
  };
};
