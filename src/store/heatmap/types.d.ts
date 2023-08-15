export interface IHeatmapSliceInitialState {
  isUploading: boolean;
  isLoading: boolean;
  error: string;
  columns: IColumn[];
  clients: IClient[];
  salesStatus: IStatus[];
  dataSet: IHeatmapItem[];
}
export interface IHeatmapFetchDataType {
  columns: IColumn[];
  clients: IClient[];
  salesStatus: IStatus[];
  dataSet: IHeatmapItem[];
}
