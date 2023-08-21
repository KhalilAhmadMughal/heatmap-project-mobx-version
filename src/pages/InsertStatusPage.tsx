import { Box } from "@mui/material";
import InsertNewStatus from "../components/InsertNewStatus";

const InsertStatusPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "4rem 0",
      }}
    >
      <InsertNewStatus />
    </Box>
  );
};

export default InsertStatusPage;
