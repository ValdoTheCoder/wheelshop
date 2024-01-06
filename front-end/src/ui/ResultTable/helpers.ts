import { ActiveType, Wheel } from "../../data-access/wheels";

export interface DataType {
  key: string;
  id: number;
  code: string;
  designCode: string;
  colorCode: string;
  size: string;
  width: string;
  holes: string;
  pcd: string;
  cb: string;
  amount: string;
  notes?: string;
  isActive?: ActiveType;
  modifier?: string;
}

export const getRowClassForRow = (row: DataType): string => {
  if (row.amount === ">4") return "row-ok";
  else if (row.amount === "4") return "row-warning";
  else if (row.modifier === "CUSTOM") return "row-custom";
  else return "row-danger";
};

export const mapResultsToDataType = (results: Array<Wheel>): Array<DataType> =>
  results.map((result) => ({
    key: `${result.id}`,
    id: result.id,
    code: result.code,
    designCode: result.designCode,
    colorCode: result.colorCode,
    size: result.size,
    width: result.width,
    holes: result.holes,
    pcd: result.pcd,
    et: result.et,
    cb: result.cb,
    amount: result.amount,
    notes: result.notes ?? undefined,
    isActive: result.isActive ?? undefined,
    modifier: result.modifier ?? undefined,
  }));
