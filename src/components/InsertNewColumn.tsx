import { IClient, IColumn, IStatus } from "../types";
import { Stack, TextField, Button, Link, Grid, Card } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";

import { UpdatingLoader } from "./UpdatingLoader";
import { insertNewClientOrColumnThunk } from "../store/heatmap/heatmapThunks";
import store from "../store";

type FormValues = {
  columnName: string;
};
const schema = yup.object({
  columnName: yup
    .string()
    .required("column name is required!")
    .min(3, "column name must be 3 characters long!")
    .max(15, "column name should not exceed 15 characters!")
    .matches(/^[^\d].*/, "column name cannot start with an integer."),
});

const InsertNewColumn = () => {
  const dispatch = store.dispatch;

  const heatmapStoreState = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state) => (state as any).heatmapReducer
  );
  const { clients, columns, salesStatus, isUploading } = heatmapStoreState;
  const myForm = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = myForm;

  const addNewColumnHandler = async (data: FormValues) => {
    const columnsData = columns;
    const clientsData = clients;
    const statusData = salesStatus;
    const newColumnName = data.columnName;

    if (
      columnsData.find(
        (column: IColumn) =>
          column.title.toLocaleLowerCase().replace(/\s/g, "") ===
          newColumnName.toLocaleLowerCase().replace(/\s/g, "")
      )
    ) {
      myForm.setError("columnName", {
        type: "manual",
        message: "column name already exists!",
      });
      return;
    }
    const defaultStatus = statusData.find(
      (status: IStatus) => status.value === 0
    );
    const newItems = clientsData.map((client: IClient) => ({
      x: client.title,
      y: newColumnName,
      value: {
        statusValue: defaultStatus ? defaultStatus.value : 0,
        statusTitle: defaultStatus ? defaultStatus.title : "N/A",
      },
    }));

    const peramObject = {
      newValue: newColumnName,
      items: newItems,
      title: "columns",
    };
    dispatch(insertNewClientOrColumnThunk(peramObject));
    myForm.setValue("columnName", "");
  };

  return (
    <>
      <Card
        style={{
          width: "50%",
          padding: "1rem",
          margin: "5rem auto 0 auto",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Insert New Column</h1>
        <form onSubmit={handleSubmit(addNewColumnHandler)} noValidate>
          <Stack spacing={4} marginTop={4}>
            <TextField
              type="text"
              label="Column"
              {...register("columnName", {
                required: true,
              })}
              error={!!errors.columnName}
              helperText={errors.columnName && errors.columnName.message}
            />
            <Grid
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Link href={"/add-client"} underline="hover">
                Insert Client
              </Link>
              <Button type="submit" variant="contained" color="info">
                add column
              </Button>
            </Grid>
          </Stack>
        </form>
      </Card>

      {isUploading && <UpdatingLoader title="Column" openModal={isUploading} />}
    </>
  );
};

export default InsertNewColumn;
