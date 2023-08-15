import { createSlice } from "@reduxjs/toolkit";
import { IHeatmapSliceInitialState } from "./types";
import {
  fetchHeatmapData,
  insertNewClientOrColumnThunk,
  insertNewSalesStatusThunk,
} from "./heatmapThunks";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config";

const initialState: IHeatmapSliceInitialState = {
  isUploading: false,
  isLoading: false,
  error: "",
  columns: [],
  clients: [],
  salesStatus: [],
  dataSet: [],
};

const heatmapSlice = createSlice({
  name: "heatmap",
  initialState: initialState,
  reducers: {
    updateHeatmapItemReducer(state, action) {
      const docRef = doc(db, "dataSet", action.payload.id);
      updateDoc(docRef, {
        value: action.payload.value,
      });
      state.dataSet.find((item) => item.id === action.payload.id).value =
        action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeatmapData.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchHeatmapData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns = action.payload.columns;
        state.clients = action.payload.clients;
        state.dataSet = action.payload.dataSet;
        state.salesStatus = action.payload.salesStatus;
      })
      .addCase(fetchHeatmapData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "An error occurred while fetching data.";
      })
      .addCase(insertNewClientOrColumnThunk.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(insertNewClientOrColumnThunk.fulfilled, (state, action) => {
        state.isUploading = false;
        const { newValue, title } = action.payload;
        console.log(`${newValue} is successfully inserted in ${title} data!`);
      })
      .addCase(insertNewClientOrColumnThunk.rejected, (state, action) => {
        state.isUploading = false;
        state.error = String(action.payload) || "Error inserting data.";
      })
      .addCase(insertNewSalesStatusThunk.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(insertNewSalesStatusThunk.fulfilled, (state, action) => {
        state.isUploading = false;
        const { title } = action.payload;
        console.log(`${title} is successfully inserted in sales status data!`);
      })
      .addCase(insertNewSalesStatusThunk.rejected, (state, action) => {
        state.isUploading = false;
        state.error = String(action.payload) || "Error inserting data.";
      });
  },
});

const heatmapReducer = heatmapSlice.reducer;
export const { updateHeatmapItemReducer } = heatmapSlice.actions;
export default heatmapReducer;
