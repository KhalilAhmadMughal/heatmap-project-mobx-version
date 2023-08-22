import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Stack, TextField, Button, Link, Grid, Card } from "@mui/material";
import { IClient, IColumn, IStatus } from "../types";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UpdatingLoader } from "./UpdatingLoader";
import { StoreContext } from "../store.context";

type FormValues = {
  client: string;
};
const schema = yup.object({
  client: yup
    .string()
    .required("client name is required!")
    .min(3)
    .max(15)
    .matches(/^[^\d].*/, "Client name cannot start with an integer."),
});

const InsertNewClientView = () => {
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

  const adnnNewClientHandler = (data: FormValues) => {
    const statusData = salesStatus;
    const clientsData = clients;
    const columnsData = columns;
    const newClient = data.client;
    if (
      clientsData.find(
        (client: IClient) =>
          client.title.toLocaleLowerCase().replace(/\s/g, "") ===
          newClient.toLocaleLowerCase().replace(/\s/g, "")
      )
    ) {
      myForm.setError("client", {
        type: "manual",
        message: "Client already exists!",
      });
      return;
    }
    const defaultStatus = statusData.find((item: IStatus) => item.value === 40);
    const newItems = columnsData.map((column: IColumn) => ({
      x: newClient,
      y: column.title,
      value: {
        statusValue: defaultStatus?.value,
        statusTitle: defaultStatus?.title,
      },
    }));
    const peramObject = {
      newValue: newClient,
      items: newItems,
      title: "clients",
    };
    insertNewClientOrColumn_method(peramObject);
    myForm.setValue("client", "");
  };

  return (
    <>
      <Card
        sx={{ flexBasis: "40%", maxHeight: "20rem", padding: "3rem 1.5rem" }}
      >
        <h1 style={{ textAlign: "center" }}>Insert New Client</h1>
        <form onSubmit={handleSubmit(adnnNewClientHandler)} noValidate>
          <Stack spacing={4} marginTop={4}>
            <TextField
              type="text"
              label="Client"
              {...register("client", {
                required: true,
              })}
              error={!!errors.client}
              helperText={errors.client && errors.client.message}
            />
            <Grid
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Link href={"/add-column"} underline="hover">
                Insert Column
              </Link>
              <Button type="submit" variant="contained" color="info">
                add client
              </Button>
            </Grid>
          </Stack>
        </form>
      </Card>
      {isUploading && <UpdatingLoader title="Client" openModal={isUploading} />}
    </>
  );
};

const InsertNewClient = observer(InsertNewClientView);
export default InsertNewClient;
