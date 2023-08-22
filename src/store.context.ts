import { createContext } from "react";
import { HeatmapStore } from "./store/heatmap.store";

interface IStoreContext {
  heatmapStore: HeatmapStore;
}

const heatmapStore = new HeatmapStore();

export const StoreContext = createContext<IStoreContext>({
  heatmapStore,
});
