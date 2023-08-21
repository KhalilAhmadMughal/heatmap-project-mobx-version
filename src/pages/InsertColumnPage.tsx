import { Box } from "@mui/material";
import InsertNewColumn from "../components/InsertNewColumn";

const InsertColumnPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "4rem 0",
      }}
    >
      <InsertNewColumn />
    </Box>
  );
};

export default InsertColumnPage;
