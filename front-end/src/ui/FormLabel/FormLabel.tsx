import { Flex } from "antd";
import React from "react";

export interface FormLabelProps {
  title: string;
  required?: boolean;
  width?: number;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  title,
  required,
  width,
}) => {
  return (
    <Flex
      style={{ flexBasis: width, flexShrink: 0, fontWeight: 600 }}
      justify="right"
      gap={3}
    >
      {required ? <div style={{ color: "#aa6215" }}>*</div> : null}
      {title}
    </Flex>
  );
};
