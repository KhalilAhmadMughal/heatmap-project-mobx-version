import { Typography, Box, CircularProgress, Modal } from "@mui/material";
export const UpdatingLoader = (props: {
  title: string;
  openModal: boolean;
}) => {
  const { title, openModal } = props;
  return (
    <>
      <Modal keepMounted open={openModal}>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress />
          <Typography color={"white"}>Updating {title}...</Typography>
        </Box>
      </Modal>
    </>
  );
};
