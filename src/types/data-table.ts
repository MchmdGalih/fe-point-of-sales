export type DataTableColumn<T> = {
  key: keyof T;
  label: string;
};

export type DataTableMeta = {
  page: number;
  limit: number;
  totalData: number;
  totalPage: number;
};
