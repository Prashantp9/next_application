import { DOMAIN } from "./ignoreConstant";

export const BASE_URL = `http://${DOMAIN}:5000`;
export const IDLE = "IDLE";
export const INTERNAL_ERROR = {
  type: "SERVER ERROR",
  message: "error occured",
};
export const Type = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  DEFAULT: "DEFAULT",
};
