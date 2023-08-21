import { Box, Link, Stack, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "12%",
          top: "18%",
          width: "20rem",
          height: "20rem",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,.03)",
        }}
      >
        <SentimentVeryDissatisfiedIcon sx={{ height: "40%", width: "40%" }} />
      </Box>
      <Stack sx={{ width: "40%" }}>
        <Typography variant="h1" fontWeight={"bold"}>
          404
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          OOPS! PAGE NOT BE FOUND
        </Typography>
        <Typography variant="subtitle2">
          Sorry but the page you are looking for does not exist, have been
          removed. name changed or is temporarily unavailable.
        </Typography>
        <Link
          href="/"
          underline="hover"
          sx={{ marginTop: "1rem", fontWeight: "bold" }}
        >
          Back to homePage
        </Link>
      </Stack>
    </Box>
  );
};
export default NotFoundPage;
