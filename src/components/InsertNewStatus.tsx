import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { IStatus } from "../types";

import { Card, Stack, Grid, TextField, Button, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UpdatingLoader } from "./UpdatingLoader";
import { StoreContext } from "../store.context";

type FormValues = {
  statusTitle: string;
  statusColor?: string;
};

const schema = yup.object({
  statusTitle: yup
    .string()
    .required("status title is required!")
    .min(8, "status title must be 8 characters long!")
    .max(20, "status title should not exceed 20 characters!")
    .matches(/^[^\d].*/, "status title cannot start with an integer."),
  statusColor: yup
    .string()
    .test("is-not-111111", "Color cannot be #000000", (color) => {
      return color !== "#000000";
    })
    .matches(/^#[0-9a-fA-F]{6}$/, "Invalid color format. Use #rrggbb"),
});

const InsertNewStatusView = () => {
  const myStore = useContext(StoreContext);
  const { getHeatmapStoreState_method, insertNewSalesStatus_method } =
    myStore.heatmapStore;
  const { isUploading, salesStatus } = getHeatmapStoreState_method();

  const myForm = useForm<FormValues>({
    resolver: yupResolver(schema) as never,
    defaultValues: {
      statusTitle: "",
      statusColor: "#000000",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = myForm;

  const validation = (enteredStatus: string, enteredColor: string) => {
    let valid = true;

    if (
      salesStatus.find(
        (status: IStatus) =>
          status.title.toLocaleLowerCase().replace(/\s/g, "") ===
          enteredStatus.toLocaleLowerCase().replace(/\s/g, "")
      )
    ) {
      myForm.setError("statusTitle", {
        type: "manual",
        message: "Status title already exist!",
      });
      valid = false;
    } else if (
      salesStatus.find(
        (status: IStatus) =>
          status.color.toLocaleLowerCase() === enteredColor.toLocaleLowerCase()
      )
    ) {
      myForm.setError("statusColor", {
        type: "manual",
        message: "This color already exist!",
      });
      valid = false;
    }
    return valid;
  };

  const addNewStatusHandler = (data: FormValues) => {
    const statusData = salesStatus;
    const enteredStatus = data.statusTitle;
    const enteredColor = data.statusColor;

    if (!validation(enteredStatus, enteredColor as never)) {
      return;
    }

    const newSalesStatusObject = {
      title: enteredStatus,
      value: statusData[statusData.length - 1].value + 10,
      color: enteredColor as never,
    };
    insertNewSalesStatus_method(newSalesStatusObject);
    myForm.reset();
  };

  return (
    <>
      <Card
        sx={{ flexBasis: "40%", maxHeight: "25rem", padding: "3rem 1.5rem" }}
      >
        <h1 style={{ textAlign: "center" }}>Add New Status</h1>
        <form onSubmit={handleSubmit(addNewStatusHandler)} noValidate>
          <Stack spacing={4} marginTop={4}>
            <TextField
              type="text"
              label="Status Title"
              {...register("statusTitle", { required: true })}
              error={!!errors.statusTitle}
              helperText={errors.statusTitle?.message}
            />
            <TextField
              type="color"
              label="Status Color"
              {...register("statusColor", { required: true })}
              error={!!errors.statusColor}
              helperText={errors.statusColor?.message}
            />
            <Grid
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Link href={"add-client"} underline="hover">
                Insert Client
              </Link>
              <Button type="submit" variant="contained" color="info">
                add status
              </Button>
            </Grid>
          </Stack>
        </form>
      </Card>
      {isUploading && (
        <UpdatingLoader title="Sales Status" openModal={isUploading} />
      )}
    </>
  );
};

const InsertNewStatus = observer(InsertNewStatusView);
export default InsertNewStatus;
