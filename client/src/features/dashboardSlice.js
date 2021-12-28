import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../apollo/client";
import {
  GET_ALL_PCKDS_LEFTBAR_QUERY,
  SET_SELECTED_PCKD_QUERY,
  SET_SELECTED_HIT_QUERY,
} from "../queries/dashboard";
import toast from "react-hot-toast";

// const userPckdDummyData = {
//   id: 1,
//   target: "https://gmail.com",
//   pckd: "gmail",
//   title: "Gmail Link for share",
//   createdAt: "1640321836440",
//   hitCount: 1,
// };

// const userPckds = [].concat(...new Array(100).fill(userPckdDummyData));

export const getUserPckds = createAsyncThunk(
  "dashboard/getUserPckds",
  async (props) => {
    // Query the client
    const res = await client.query({
      query: GET_ALL_PCKDS_LEFTBAR_QUERY,
      fetchPolicy: props && props.refetch && "no-cache",
    });

    // Delete typene
    delete res.data.getAllPckds.__typename;

    // Fullfill the action
    return res.data.getAllPckds;
  }
);

export const selectPckd = createAsyncThunk(
  "dashboard/selectPckd",
  async (id) => {
    // If no id is provided, return
    if (!id) return null;

    const res = await client.query({
      query: SET_SELECTED_PCKD_QUERY,
      variables: {
        id,
      },
    });

    // Fullfill the action
    return res.data.getPckdInfo;
  }
);

export const selectHit = createAsyncThunk("dashboard/selectHit", async (id) => {
  // If no id is provided, return
  if (!id) return null;

  const res = await client.query({
    query: SET_SELECTED_HIT_QUERY,
    variables: {
      hitId: id,
    },
  });

  // Fullfill the action
  return res.data.hit;
});

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    userPckds: [],
    activePckd: null,
  },
  reducers: {
    selectHit: (state, action) => {
      state.selectedHit = action.payload;
    },
  },
  extraReducers: {
    [getUserPckds.fulfilled]: (state, action) => {
      state.userPckds = action.payload;
    },
    [selectPckd.fulfilled]: (state, action) => {
      state.activePckd = action.payload;
    },
    [selectHit.fulfilled]: (state, action) => {
      state.activeHit = action.payload;
    },
    [getUserPckds.rejected]: (state, action) => {
      toast.error(`Query Failed: ${action.error.message}`);
    },
    [selectPckd.rejected]: (state, action) => {
      toast.error(`Query Failed: ${action.error.message}`);
    },
    [selectHit.rejected]: (state, action) => {
      toast.error(`Query Failed: ${action.error.message}`);
    },
  },
});

// export const { selectHit } = dashboardSlice.actions;

export const selectUserPckds = (state) => state.dashboard.userPckds;

export default dashboardSlice.reducer;
