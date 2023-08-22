import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { IClient, IColumn, IStatus } from "../types";
import { Stack, TextField, Button, Link, Grid, Card } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { UpdatingLoader } from "./UpdatingLoader";
import { StoreContext } from "../store.context";

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

const InsertNewColumnView = () => {
  const myStore = useContext(StoreContext);
  const { insertNewClientOrColumn_method, getHeatmapStoreState_method } =
    myStore.heatmapStore;
  const { clients, columns, salesStatus, isUploading } =
    getHeatmapStoreState_method();

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
      (status: IStatus) => status.value === 40
    );
    const newItems = clientsData.map((client: IClient) => ({
      x: client.title,
      y: newColumnName,
      value: {
        statusValue: defaultStatus?.value,
        statusTitle: defaultStatus?.title,
      },
    }));

    const peramObject = {
      newValue: newColumnName,
      items: newItems,
      title: "columns",
    };

    insertNewClientOrColumn_method(peramObject);
    myForm.setValue("columnName", "");
  };

  return (
    <>
      <Card
        style={{ flexBasis: "40%", maxHeight: "20rem", padding: "3rem 1.5rem" }}
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

const InsertNewColumn = observer(InsertNewColumnView);
export default InsertNewColumn;
