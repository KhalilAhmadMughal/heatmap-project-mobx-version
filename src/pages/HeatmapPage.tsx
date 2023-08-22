import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Box, CircularProgress, Typography } from "@mui/material";

import { Heatmap } from "../components/heatmap/Heatmap";
import { StoreContext } from "../store.context";

const HeatmapPageView = () => {
  const myStore = useContext(StoreContext);
  const { getHeatmapStoreState_method } = myStore.heatmapStore;
  const { isLoading, dataSet, error } = getHeatmapStoreState_method();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : dataSet.length ? (
        <Heatmap width={1540} height={768} data={dataSet} />
      ) : (
        <Typography variant="h6" color={"red"}>
          {error || "Failed to fetch Data!"}
        </Typography>
      )}
    </Box>
  );
};

const HeatmapPage = observer(HeatmapPageView);
export default HeatmapPage;
