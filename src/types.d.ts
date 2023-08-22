import { Timestamp } from "firebase/firestore";
export interface IClient {
  id: string;
  title: string;
  createdAt: Timestamp;
}

export interface IStatus {
  id: string;
  title: string;
  value: number;
  color: string;
  createdAt: Timestamp;
}

export interface IColumn {
  id: string;
  title: string;
  createdAt: Timestamp;
}

export interface IHeatmapItem {
  id: string;
  x: string;
  y: string;
  value: {
    statusValue: number;
    statusTitle: string;
  };
  createdAt: Timestamp;
}
