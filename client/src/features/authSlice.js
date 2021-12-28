import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_USER, LOGIN_USER, SIGNUP_USER } from "../queries/user";
import client from "../apollo/client";
import toast from "react-hot-toast";

// User State structure
const userInitialState = {
  userInfo: {
    id: null,
    name: null,
    email: null,
    createdAt: null,
  },
  token: null,
  status: null,
  loggedIn: false,
};

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }) => {
    // Login request is generated
    const res = await client.mutate({
      mutation: LOGIN_USER,
      variables: { email, password },
    });

    // Fullfill the loginUser action
    return res.data.login.token;
  }
);

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ email, password, name }) => {
    // signup request is generated
    const res = await client.mutate({
      mutation: SIGNUP_USER,
      variables: { email, password, name },
    });

    // Fullfill the signupUser action
    return res.data.signup.token;
  }
);

export const initializeUser = createAsyncThunk(
  "users/initializeUser",
  async () => {
    const res = await client.query({
      query: GET_USER,
    });

    // Fullfill the loginUser action
    return res.data.getUserInfo;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: userInitialState,
  reducers: {
    logoutUser: (state) => {
      state = userInitialState;
    },
  },

  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loginStatus = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      if (action.payload) {
        state.token = action.payload;
        state.loginStatus = "success";

        // Save to local storage
        localStorage.setItem("token", action.payload);
      }
    },
    [loginUser.rejected]: (state, action) => {
      state.loginStatus = "failed";
      toast.error(action?.error?.message);
    },
    [signupUser.pending]: (state) => {
      state.signupStatus = "loading";
    },
    [signupUser.fulfilled]: (state, action) => {
      if (action.payload) {
        state.token = action.payload;
        state.signupStatus = "success";

        // Save to local storage
        localStorage.setItem("token", action.payload);
      }
    },
    [signupUser.rejected]: (state, action) => {
      state.signupStatus = "failed";
      toast.error(action?.error?.message);
    },

    // initialize
    [initializeUser.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userInfo = action.payload;
        state.loggedIn = true;
        state.loginAttempted = true;
      }
    },
    [initializeUser.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(`Login Failed: ${action?.error?.message}`);
    },
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
