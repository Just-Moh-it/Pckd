import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_USER, LOGIN_USER } from "../queries/user";
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

export const initializeUser = createAsyncThunk(
  "users/initializeUser",
  async () => {
    const res = await client.mutate({
      mutation: GET_USER,
    });

    delete res.data.getUserInfo.__typename

    // Fullfill the loginUser action
    return res.data.getUserInfo;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: userInitialState,
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
      toast.error(action.error.message);
    },

    // initialize
    [initializeUser.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userInfo = action.payload;
        state.loginAttempted = true;
      }
    },
    [initializeUser.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(`Login Failed: ${action.error.message}`);
    },
  },
});

export default authSlice.reducer;
