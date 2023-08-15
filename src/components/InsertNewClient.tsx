import { Stack, TextField, Button, Link, Grid, Card } from "@mui/material";
import { IClient, IColumn, IHeatmapItem } from "../types";
import { useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import store from "../store";
import { insertNewClientOrColumnThunk } from "../store/heatmap/heatmapThunks";
import { UpdatingLoader } from "./UpdatingLoader";

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

const InsertNewClient = () => {
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

    const newItems: IHeatmapItem[] = columnsData.map((column: IColumn) => ({
      x: newClient,
      y: column.title,
      value: {
        statusValue: statusData[0].value,
        statusTitle: statusData[0].title,
      },
    }));
    const peramObject = {
      newValue: newClient,
      items: newItems,
      title: "clients",
    };
    dispatch(insertNewClientOrColumnThunk(peramObject));
    myForm.setValue("client", "");
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

export default InsertNewClient;
