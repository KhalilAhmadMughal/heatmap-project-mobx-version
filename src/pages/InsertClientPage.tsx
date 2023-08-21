import { Box } from "@mui/material";
import InsertNewClient from "../components/InsertNewClient";

const InsertClientPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "4rem 0",
      }}
    >
      <InsertNewClient />
    </Box>
  );
};

export default InsertClientPage;
