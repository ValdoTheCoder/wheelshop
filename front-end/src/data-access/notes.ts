import { Wheel, baseUrl, headers } from "./wheels";

export interface NoteAddRequest {
  code: string;
  notes?: string;
}

export const updateNotes = async (req: NoteAddRequest): Promise<Wheel> => {
  const url = `${baseUrl}/notes`;
  const data = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(req),
  }).then((response) => response.json());

  return data;
};
