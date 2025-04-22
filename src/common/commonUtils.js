import Cookies from "js-cookie";
// import jwt_decode from "jwt-decode";
import moment from "moment";
import { getAPICall } from "../api/apiService";

export function getToken() {
  return Cookies.get("userID");
}

export function deleteToken() {
  Cookies.remove("token");
  return true;
}
export function getUserId() {
  let token = getToken();
  if (token === null || token === undefined) {
    return null;
  } else {
    return Cookies.get("userID");
  }
}
export async function getUserEmail() {
  let token = getToken();
  if (token === null || token === undefined) {
    return null;
  } else {
    let userId = Cookies.get("userID");
    if (userId) {
      const response = await getAPICall("/userDetails?userId=" + userId);
      return response["userEmail"];
    }
  }
}

// export default getUserEmail;

export async function getUserName() {
  let token = getToken();
  if (token === null || token === undefined) {
    return null;
  } else {
    let userId = Cookies.get("userID");
    console.log("userid", userId);
    if (userId) {
      const response = await getAPICall("/userDetails?userId=" + userId);
      console.log("response", response);
      return response["userName"];
    }
  }
}

export function makeFirstLetterCaps(inputString) {
  if (inputString !== null || inputString !== undefined) {
    return (
      inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
    );
  } else {
    return inputString;
  }
}

// parser function to detect new line \\n from mongodb and change it appropriately.
export const parseLines = (value) => value.replaceAll(/(\\n)/g, "\n");
// export const parseLines = (value) => value.replaceAll(/(\\n)/g, '{"\n"}');

export const dateFormat = (date) => {
  let df = moment(date).format("DD-MMM-YYYY");

  return df;
};

export const removeToken = async () => {
  Cookies.remove("token");
};
