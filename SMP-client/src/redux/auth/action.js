// actions.js
import axios from "axios";

import { loginFail, loginRequest, loginSuccess, registerFail, registerRequest, registerSuccess, userData } from "./reducer";
import { SERVER_URL } from "../../config";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch(loginRequest({}));
  try {
    const response = await axios.post(`${SERVER_URL + "/signin"}`, loginData.data);
    const { token, message } = response.data;

    if (token != null) {
      localStorage.setItem("jwt", JSON.stringify(token));
      console.log("Token stored");
      const response = await axios.get(`${SERVER_URL + "/user/jwt"}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("user", JSON.stringify(response.data));

      await dispatch(loginSuccess({ token: token, user: response.data }));

      // console.log(token, response);
    } else {
      throw new Error("error:" + response.response);
    }
  } catch (error) {
    console.log(error);
    // dispatch(loginFail({ payload: err.response.data.message }));

    if (axios.isAxiosError(error)) {
      // Axios error
      console.error("Axios error:", error);
      console.error("Axios response:", error.response); // Response details
      await dispatch(loginFail({ payload: "Axios request failed :" + error.response.data.message }));
    } else {
      // Other errors
      console.error("Other error:", error);
      dispatch(loginFail({ payload: error.message }));
    }
  }
};

export const registerUserAction = (registerData) => async (dispatch) => {
  dispatch(registerRequest({}));
  try {
    const response = await axios.post(`${SERVER_URL + "/signup"}`, registerData.data);
    const { token, message } = response.data;
    // console.log("response" + JSON.stringify(response.data));
    if (token != null) {
      localStorage.setItem("jwt", token);
      console.log("Token stored");
      dispatch(registerSuccess({ payload: token }));
    } else {
      throw new Error(response.response.data);
    }
  } catch (err) {
    console.log(err);
    dispatch(registerFail({ payload: err.message }));
  }
};
