import { configureStore } from "@reduxjs/toolkit";
import heatmapReducer from "./heatmap";

const store = configureStore({
  reducer: { heatmapReducer },
});

export default store;
