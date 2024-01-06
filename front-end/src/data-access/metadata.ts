import { baseUrl } from "./wheels";

export interface Metadata {
  updatedTime: string;
  total: number;
  activeTotal: number;
  suspendedTotal: number;
}

export const getMetadata = async (): Promise<Metadata> => {
  const url = `${baseUrl}/metadata`;
  const data = await fetch(url).then((response) => response.json());

  return data;
};
