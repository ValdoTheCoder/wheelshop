import { SelectProps } from "antd";

export const sizeOptions = (): SelectProps["options"] => {
  const options: SelectProps["options"] = [];

  for (let i = 12; i <= 24; i++) {
    options.push({
      label: `R${i}`,
      value: `R${i}`,
    });
  }

  return options;
};

export const holesOptions: SelectProps["options"] = [
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
  {
    label: "6",
    value: "6",
  },
  {
    label: "8",
    value: "8",
  },
  {
    label: "9",
    value: "9",
  },
  {
    label: "10",
    value: "10",
  },
  {
    label: "12",
    value: "12",
  },
];

export type ActiveStates = "ACTIVE" | "SUSPENDED" | "ALL";

interface Option {
  label: string;
  value: ActiveStates;
}

export const radioOptions: Array<Option> = [
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Suspended",
    value: "SUSPENDED",
  },
  {
    label: "All",
    value: "ALL",
  },
];
