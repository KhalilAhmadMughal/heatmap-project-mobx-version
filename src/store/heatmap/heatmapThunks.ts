import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDocs,
  query,
  collection,
  orderBy,
  Timestamp,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config";
import { IClient, IColumn, IHeatmapItem, IStatus } from "../../types";
import { IHeatmapFetchDataType } from "./types";

const serializeAndDeserialTime = (peram: Timestamp | number) => {
  if (peram instanceof Timestamp) {
    return peram.toMillis();
  } else {
    return Timestamp.fromDate(new Date(peram));
  }
};
const insertNewHeatmapDatasetItems = async (items: any) => {
  const dataSetCollectionRef = collection(db, "dataSet");
  for (const item of items) {
    await addDoc(dataSetCollectionRef, {
      ...item,
      createdAt: serverTimestamp(),
    });
  }
};
const insertNewClientOrColumnData = async (
  clientOrColumn: string,
  title: string
) => {
  let collectionRef;
  if (title === "clients" || title === "client") {
    collectionRef = collection(db, "clients");
  } else if (title === "columns" || title === "column") {
    collectionRef = collection(db, "columns");
  } else {
    return { error: "Invalid Title." };
  }
  await addDoc(collectionRef, {
    title: clientOrColumn,
    createdAt: serverTimestamp(),
  });
};

export const insertNewClientOrColumnThunk = createAsyncThunk(
  "heatmap/insertNewClientOrColumnThunk",
  async (peram: any, { rejectWithValue }) => {
    try {
      await insertNewHeatmapDatasetItems(peram.items);
      await insertNewClientOrColumnData(peram.newValue, peram.title);
      await fetchHeatmapData();
      return { newValue: peram.newValue, title: peram.title };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const insertNewSalesStatusThunk = createAsyncThunk(
  "heatmap/insertNewSalesStatusThunk",
  async (peram: any, { rejectWithValue }) => {
    const collectionRef = collection(db, "salesStatus");
    try {
      await addDoc(collectionRef, {
        title: peram.title,
        value: peram.value,
        color: peram.color,
        createdAt: serverTimestamp(),
      });
      return { title: peram.title };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchHeatmapData = createAsyncThunk<IHeatmapFetchDataType, void>(
  "heatmap/fetchData",
  async () => {
    const [
      clientsSnapshot,
      columnsSnapshot,
      dataSetSnapshot,
      salesStatusSnapshot,
    ] = await Promise.all([
      getDocs(query(collection(db, "clients"), orderBy("createdAt"))),
      getDocs(query(collection(db, "columns"), orderBy("createdAt"))),
      getDocs(query(collection(db, "dataSet"), orderBy("createdAt"))),
      getDocs(query(collection(db, "salesStatus"), orderBy("createdAt"))),
    ]);

    const clientsData = clientsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      createdAt: serializeAndDeserialTime(doc.data().createdAt),
      id: doc.id,
    })) as IClient[];
    const columnsData = columnsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      createdAt: serializeAndDeserialTime(doc.data().createdAt),
      id: doc.id,
    })) as IColumn[];
    const dataSetData = dataSetSnapshot.docs.map((doc) => ({
      ...doc.data(),
      createdAt: serializeAndDeserialTime(doc.data().createdAt),
      id: doc.id,
    })) as IHeatmapItem[];
    const salesStatusData = salesStatusSnapshot.docs.map((doc) => ({
      ...doc.data(),
      createdAt: serializeAndDeserialTime(doc.data().createdAt),
      id: doc.id,
    })) as IStatus[];

    return {
      clients: clientsData,
      columns: columnsData,
      dataSet: dataSetData,
      salesStatus: salesStatusData,
    };
  }
);
