export interface CommonValues {
  designCode: {
    value: string;
    onChange: (designCode: string) => void;
  };
  colorCode: {
    value: string;
    onChange: (colorCode: string) => void;
  };
  size: {
    value: string;
    onChange: (size: string) => void;
  };
  width: {
    value: string;
    onChange: (width: string) => void;
  };
  holes: {
    value: string;
    onChange: (holes: string) => void;
  };
  pcd: {
    value: string;
    onChange: (pcd: string) => void;
  };
  et: {
    value: string;
    onChange: (et: string) => void;
  };
  cb: {
    value: string;
    onChange: (cb: string) => void;
  };
}

export interface UpdateValues extends CommonValues {
  description: string;
  code: string;
}

export interface CreateValues extends CommonValues {
  description: {
    value: string;
    onChange: (desc: string) => void;
  };
  code: {
    value: string;
    onChange: (code: string) => void;
  };
}
