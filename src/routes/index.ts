import { ReactNode } from "react";
import StoreData from "../components/StoreData";
import {
  HeatmapPage,
  InsertClientPage,
  InsertColumnPage,
  InsertStatusPage,
  NotFoundPage,
} from "../pages";

interface IRoutesType {
  id: number;
  title: string;
  path: string;
  element: () => ReactNode;
}

export const clientSideRoutes: IRoutesType[] = [
  {
    id: 1,
    title: "heatmapPage",
    path: "/",
    element: HeatmapPage,
  },
  {
    id: 2,
    title: "InsertClientPage",
    path: "/add-client",
    element: InsertClientPage,
  },
  {
    id: 3,
    title: "InsertColumnPage",
    path: "/add-column",
    element: InsertColumnPage,
  },
  {
    id: 4,
    title: "InsertStatusPage",
    path: "/add-status",
    element: InsertStatusPage,
  },
  {
    id: 5,
    title: "storeDataInDB",
    path: "/default",
    element: StoreData,
  },
  {
    id: 6,
    title: "NotFoundPage",
    path: "*",
    element: NotFoundPage,
  },
];
