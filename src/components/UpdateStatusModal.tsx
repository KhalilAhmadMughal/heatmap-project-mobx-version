import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  Card,
  Stack,
  Button,
  Modal,
  Typography,
  TextField,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { IHeatmapItem, IStatus } from "../types";
import { StoreContext } from "../store.context";

type FormValues = { inputStatusId: string };

const cardStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const buttonsContainerStyles = {
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  gap: "1rem",
};

interface IProps {
  openModal: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  clickedItemData: IHeatmapItem;
  salesStatus: IStatus[];
  dataSet: IHeatmapItem[];
}

const UpdateStatusModalView = (props: IProps) => {
  const { openModal, handleClose, dataSet, salesStatus, clickedItemData } =
    props;
  const myStore = useContext(StoreContext);
  const { updateHeatmapItem_method } = myStore.heatmapStore;
  const myForm = useForm<FormValues>({
    defaultValues: {
      inputStatusId: "",
    },
  });
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = myForm;

  useEffect(() => {
    const currentStatus = salesStatus.find(
      (status) => status.value === clickedItemData.value.statusValue
    );
    myForm.setValue("inputStatusId", currentStatus ? currentStatus.id : "");
  }, [clickedItemData, myForm, salesStatus]);

  const closeMiddlewareHandler = () => {
    myForm.reset;
    handleClose();
  };

  const updateStatusHandler = (data: FormValues) => {
    const statusData = salesStatus;
    const selectedStatus = statusData.find(
      (status) => status.id === data.inputStatusId
    );

    const valueObject: { statusTitle: string; statusValue: number } = {
      statusTitle: selectedStatus ? selectedStatus.title : "N/A",
      statusValue: selectedStatus ? selectedStatus.value : 0,
    };
    const updatedHeatmapItemObject: IHeatmapItem = {
      ...clickedItemData,
      value: valueObject,
    };

    updateHeatmapItem_method(updatedHeatmapItemObject);
    closeMiddlewareHandler();
  };

  return (
    <>
      <Modal
        keepMounted
        open={openModal}
        onClose={closeMiddlewareHandler}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Card sx={cardStyles}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h4"
            component="h4"
            sx={{ textAlign: "center", marginBottom: "2rem" }}
          >
            Update Status
          </Typography>
          <form onSubmit={handleSubmit(updateStatusHandler)} noValidate>
            <Stack spacing={4}>
              <TextField
                label={"Client"}
                value={clickedItemData.x || ""}
                disabled
              />
              <TextField
                label={"Column"}
                value={clickedItemData.y || ""}
                disabled
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel color="info" id="statusLabel">
                  Select Status
                </InputLabel>
                <Select
                  labelId="statusLabel"
                  id="statusSelect"
                  value={watch("inputStatusId")}
                  label="Select Status"
                  {...register("inputStatusId", {
                    required: "Please select one of the given option!",
                  })}
                  error={!!errors.inputStatusId}
                >
                  {salesStatus.map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Box
                          sx={{
                            height: "20px",
                            width: "20px",
                            background: `${status.color}`,
                            borderRadius: "1rem",
                          }}
                        ></Box>
                        <span style={{ textTransform: "capitalize" }}>
                          {status.title}
                        </span>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!errors.inputStatusId}>
                  {errors.inputStatusId?.message}
                </FormHelperText>
              </FormControl>

              <Box sx={buttonsContainerStyles}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={closeMiddlewareHandler}
                >
                  cancel
                </Button>
                <Button type="submit" variant="contained" color="info">
                  update
                </Button>
              </Box>
            </Stack>
          </form>
        </Card>
      </Modal>
    </>
  );
};

const UpdateStatusModal = observer(UpdateStatusModalView);
export default UpdateStatusModal;
