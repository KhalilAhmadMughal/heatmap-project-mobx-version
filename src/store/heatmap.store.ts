import { makeAutoObservable } from "mobx";
import { IClient, IColumn, IHeatmapItem, IStatus } from "../types";
import {
  fetchHeatmapData,
  fetchSalesStatus,
  insertNewClientOrColumn,
  insertNewSalesStatus,
} from "./services.store";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config";

export class HeatmapStore {
  private isUploading = false;
  private isLoading = false;
  private error = "";
  private clients: IClient[] = [];
  private columns: IColumn[] = [];
  private salesStatus: IStatus[] = [];
  private dataSet: IHeatmapItem[] = [];

  private setIsLoading(loading: boolean) {
    this.isLoading = loading;
  }
  private setIsUploading(uploading: boolean) {
    this.isUploading = uploading;
  }
  private setError(newError: string) {
    this.error = newError;
  }
  private setSalesStatus(newSalesStatus: IStatus[]) {
    this.salesStatus = newSalesStatus;
  }
  private setDataSet(newDataSet: IHeatmapItem[]) {
    this.dataSet = newDataSet;
  }
  private setClients(newClients: IClient[]) {
    this.clients = newClients;
  }
  private setColumns(newColumns: IColumn[]) {
    this.columns = newColumns;
  }
  private setSingleHeatmapItemById(newItem: IHeatmapItem) {
    const index = this.dataSet.findIndex((item) => item.id === newItem.id);
    index !== -1 ? (this.dataSet[index].value = newItem.value) : "";
  }

  constructor() {
    makeAutoObservable(this);
    this.updateHeatmapItem_method = this.updateHeatmapItem_method.bind(this);
    this.getHeatmapData_method = this.getHeatmapData_method.bind(this);
    this.getHeatmapStoreState_method =
      this.getHeatmapStoreState_method.bind(this);
    this.insertNewClientOrColumn_method =
      this.insertNewClientOrColumn_method.bind(this);
    this.insertNewSalesStatus_method =
      this.insertNewSalesStatus_method.bind(this);
    this.getSalesStatus_method = this.getSalesStatus_method.bind(this);
    this.setColumns = this.setColumns.bind(this);
  }

  updateHeatmapItem_method(newItem: IHeatmapItem) {
    const docRef = doc(db, "dataSet", newItem.id);
    updateDoc(docRef, {
      value: newItem.value,
    });
    this.setSingleHeatmapItemById(newItem);
  }

  insertNewClientOrColumn_method = async (peram: any) => {
    this.setIsUploading(true);
    await insertNewClientOrColumn(peram)
      .then((data: any) => {
        const { newValue, title } = data;
        console.log(`${newValue} is successfully inserted in ${title} data!`);
        this.setIsUploading(false);
        this.getHeatmapData_method();
      })
      .catch((err) => {
        console.log({ Error: err });
        this.setError(err);
        this.setIsUploading(false);
      });
  };

  insertNewSalesStatus_method = async (peram: any) => {
    this.setIsUploading(true);
    await insertNewSalesStatus(peram)
      .then((data: any) => {
        this.setIsUploading(false);
        this.getSalesStatus_method();
        console.log(`${data} is successfully inserted in sales status data!`);
      })
      .catch((err) => {
        this.setIsUploading(false);
      });
  };

  getHeatmapData_method = async () => {
    this.setIsLoading(true);
    await fetchHeatmapData()
      .then((data) => {
        this.setIsLoading(false);
        this.setClients(data.clients);
        this.setColumns(data.columns);
        this.setDataSet(data.dataSet);
        this.setSalesStatus(data.salesStatus);
      })
      .catch((err) => {
        this.setIsLoading(false);
        this.setError(err);
      });
  };
  getSalesStatus_method = async () => {
    this.setIsLoading(true);
    await fetchSalesStatus()
      .then((data) => {
        this.setIsLoading(false);
        this.setSalesStatus(data.salesStatus);
      })
      .catch((err) => {
        this.setIsLoading(false);
        this.setError(err);
      });
  };
  getHeatmapStoreState_method = () => {
    return {
      clients: this.clients,
      columns: this.columns,
      salesStatus: this.salesStatus,
      dataSet: this.dataSet,
      error: this.error,
      isLoading: this.isLoading,
      isUploading: this.isUploading,
    };
  };
}
