import { Box, CircularProgress, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { Heatmap } from "../components/heatmap/Heatmap";

const HeatmapPage = () => {
  const dispatch = useDispatch();
  const heatmapStoreState = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state) => (state as any).heatmapReducer
  );
  const { isLoading, dataSet, error } = heatmapStoreState;

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
      {/* <Heatmap width={1540} height={768} data={newDataSet} />
       */}
    </Box>
  );
};

export default HeatmapPage;
