import { IClient, IColumn, IHeatmapItem, IStatus } from "../types";

// export const COLORS = ["#D3D3D3", "#800C0C", "#12127D", "#9D930F", "#1F6E1F"];

export const COLORS = ["#D3D3D3", "#1F6E1F", "#800C0C", "#9D930F", "#FFFFFF"];

export const THRESHOLDS = [0, 10, 20, 30, 40];

export const clients: IClient[] = [
  {
    id: 1,
    title: "acme crop",
  },
  {
    id: 2,
    title: "abc inc",
  },
  {
    id: 3,
    title: "xyz llc",
  },
  {
    id: 4,
    title: "test 1",
  },
  {
    id: 5,
    title: "test 2",
  },
  {
    id: 6,
    title: "test 3",
  },
  {
    id: 7,
    title: "test 4",
  },
];
export const columns: IColumn[] = [
  { id: 1, title: "core" },
  { id: 2, title: "distribution" },
  { id: 3, title: "access" },
  { id: 4, title: "wireless" },
  { id: 5, title: "mdm" },
  { id: 6, title: "routing" },
  { id: 7, title: "waas" },
  { id: 8, title: "sd-wan" },
  { id: 9, title: "carrier" },
  { id: 10, title: "voice" },
  { id: 11, title: "contact center" },
  { id: 12, title: "video" },
];
export const salesStatus: IStatus[] = [
  {
    id: 1,
    title: "N/A",
    value: 0,
    color: "#D3D3D3",
  },
  {
    id: 2,
    title: "customer",
    value: 10,
    color: "#1F6E1F",
  },
  {
    id: 3,
    title: "no opportunity",
    value: 20,
    color: "#800C0C",
  },
  {
    id: 4,
    title: "potential opportunity",
    value: 30,
    color: "#9D930F",
  },
  {
    id: 5,
    title: "don't know",
    value: 40,
    color: "#FFFFFF",
  },
];
export const dataSet: IHeatmapItem[] = [
  {
    x: "acme crop",
    y: "core",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "acme crop",
    y: "distribution",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "acme crop",
    y: "access",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "acme crop",
    y: "wireless",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "acme crop",
    y: "mdm",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "acme crop",
    y: "routing",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "acme crop",
    y: "waas",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "acme crop",
    y: "sd-wan",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "acme crop",
    y: "carrier",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "acme crop",
    y: "voice",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "acme crop",
    y: "contact center",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "acme crop",
    y: "video",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "abc inc",
    y: "core",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "abc inc",
    y: "distribution",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "abc inc",
    y: "access",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "abc inc",
    y: "wireless",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "abc inc",
    y: "mdm",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "abc inc",
    y: "routing",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "abc inc",
    y: "waas",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "abc inc",
    y: "sd-wan",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "abc inc",
    y: "carrier",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "abc inc",
    y: "voice",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "abc inc",
    y: "contact center",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "abc inc",
    y: "video",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "xyz llc",
    y: "core",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "xyz llc",
    y: "distribution",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "xyz llc",
    y: "access",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "xyz llc",
    y: "wireless",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "xyz llc",
    y: "mdm",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "xyz llc",
    y: "routing",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "xyz llc",
    y: "waas",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "xyz llc",
    y: "sd-wan",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "xyz llc",
    y: "carrier",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "xyz llc",
    y: "voice",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "xyz llc",
    y: "contact center",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "xyz llc",
    y: "video",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 1",
    y: "core",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 1",
    y: "distribution",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 1",
    y: "access",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 1",
    y: "wireless",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 1",
    y: "mdm",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "test 1",
    y: "routing",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "test 1",
    y: "waas",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "test 1",
    y: "sd-wan",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "test 1",
    y: "carrier",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "test 1",
    y: "voice",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 1",
    y: "contact center",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "test 1",
    y: "video",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 2",
    y: "core",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 2",
    y: "distribution",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 2",
    y: "access",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 2",
    y: "wireless",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 2",
    y: "mdm",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 2",
    y: "routing",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 2",
    y: "waas",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 2",
    y: "sd-wan",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 2",
    y: "carrier",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 2",
    y: "voice",
    value: {
      statusTitle: "no opportunity",
      statusValue: 20,
    },
  },
  {
    x: "test 2",
    y: "contact center",
    value: {
      statusTitle: "no opportunity",
      statusValue: 20,
    },
  },
  {
    x: "test 2",
    y: "video",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 3",
    y: "core",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "test 3",
    y: "distribution",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 3",
    y: "access",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 3",
    y: "wireless",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 3",
    y: "mdm",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 3",
    y: "routing",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 3",
    y: "waas",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 3",
    y: "sd-wan",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 3",
    y: "carrier",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 3",
    y: "voice",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 3",
    y: "contact center",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 3",
    y: "video",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 4",
    y: "core",
    value: {
      statusTitle: "potential opportunity",
      statusValue: 30,
    },
  },
  {
    x: "test 4",
    y: "distribution",
    value: {
      statusTitle: "no opportunity",
      statusValue: 20,
    },
  },
  {
    x: "test 4",
    y: "access",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 4",
    y: "wireless",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 4",
    y: "mdm",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 4",
    y: "routing",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 4",
    y: "waas",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 4",
    y: "sd-wan",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 4",
    y: "carrier",
    value: {
      statusTitle: "don't know",
      statusValue: 40,
    },
  },
  {
    x: "test 4",
    y: "voice",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 4",
    y: "contact center",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
  {
    x: "test 4",
    y: "video",
    value: {
      statusTitle: "customer",
      statusValue: 10,
    },
  },
];
