import { ActiveStates } from "../utils/utils";

export const baseUrl = "http://localhost:3001";

export const PAGE_SIZE = 100;

export const headers = { "Content-Type": "application/json" };

export type ActiveType = "ACTIVE" | "SUSPENDED";

export interface Wheel {
  id: number;
  fullString: string;
  code: string;
  designCode: string;
  colorCode: string;
  size: string;
  width: string;
  holes: string;
  pcd: string;
  et: string;
  cb: string;
  amount: string;
  notes: string | null;
  isActive: ActiveType | null;
  modifier: string | null;
}

export interface FindRequest {
  designCode?: string;
  colorCode?: string;
  isActive?: ActiveStates;
  size?: string;
  holes?: string;
  pcd?: string;
}

export interface FindResponse {
  paginatedData: Array<Wheel>;
  total: number;
}

export interface CreateRequest {
  description: string;
  code: string;
  designCode: string;
  colorCode: string;
  size: string;
  width: string;
  holes: string;
  pcd: string;
  et: string;
  cb: string;
}

export interface UpdateRequest {
  code: string;
  designCode: string;
  colorCode: string;
  size: string;
  width: string;
  holes: string;
  pcd: string;
  et: string;
  cb: string;
}

export interface ActivateResponse {
  wheel: Wheel;
  activeTotal: number;
  suspendedTotal: number;
}

export interface DeleteResponse {
  code: string;
  activeTotal: number;
  suspendedTotal: number;
}

export const activateEntry = async (
  code: string,
  isActive: string
): Promise<ActivateResponse> => {
  const url = `${baseUrl}/activate`;
  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({ code, isActive }),
  });

  const data = await response.json();

  return data;
};

export const find = async (
  page: number,
  req?: FindRequest
): Promise<FindResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: PAGE_SIZE.toString(),
  });
  if (req?.isActive) params.append("isActive", req.isActive);
  if (req?.designCode) params.append("designCode", req.designCode);
  if (req?.colorCode) params.append("colorCode", req.colorCode);
  if (req?.size) params.append("size", req.size);
  if (req?.holes) params.append("holes", req.holes);
  if (req?.pcd) params.append("pcd", req.pcd);

  const url = `${baseUrl}/search?${params}`;

  const data = await fetch(url).then((data) => data.json());

  return data;
};

export const loadStock = async (): Promise<string> => {
  const url = `${baseUrl}/load_stock`;

  const response = await fetch(url).then((data) => data.json());

  return response;
};

export const update = async (req: UpdateRequest): Promise<Wheel> => {
  const url = `${baseUrl}/update`;
  const data = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(req),
  }).then((data) => data.json());

  return data;
};

export const createEntry = async (req: CreateRequest): Promise<void> => {
  const url = `${baseUrl}`;
  await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(req),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  });
};

export const deleteEntry = async (code: string): Promise<DeleteResponse> => {
  const url = `${baseUrl}?code=${encodeURIComponent(code)}`;
  const data = await fetch(url, {
    method: "DELETE",
    headers,
  }).then((response) => {
    if (!response.ok) throw new Error("Delete Error");
    else return response.json();
  });

  return data;
};

export const removeActivated = async (
  code: string
): Promise<DeleteResponse> => {
  console.log(code);

  const url = `${baseUrl}/activate?code=${encodeURIComponent(code)}`;
  const data = await fetch(url, {
    method: "DELETE",
    headers,
  }).then((response) => {
    if (!response.ok) throw new Error("Remove activated Error");
    else return response.json();
  });

  return data;
};

export const loadWheels = async (): Promise<void> => {
  const url = `${baseUrl}/load_wheels`;
  await fetch(url).then((response) => {
    if (!response.ok) throw new Error("Wheels not loaded");
  });
};
