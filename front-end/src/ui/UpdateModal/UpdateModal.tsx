import { Flex, Input, Modal, Typography } from "antd";
import React from "react";
import "./UpdateModal.css";
import { FormLabel } from "../FormLabel/FormLabel";
import { UpdateValues } from "../../utils/types";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Text } = Typography;

export interface UpdateModalProps {
  isOpen: boolean;
  isSaveDisabled: boolean;
  onClose: () => void;
  onConfirm: () => void;
  updateValues: UpdateValues;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  isSaveDisabled,
  onClose,
  onConfirm,
  updateValues,
}) => {
  const labelWidth = 100;
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      okText="Update"
      destroyOnClose
      closeIcon={false}
      okButtonProps={{
        disabled: isSaveDisabled,
        icon: <CheckOutlined />,
      }}
      cancelButtonProps={{
        icon: <CloseOutlined />,
      }}
      width={900}
      title="Update Wheel Entry"
      className="update-modal"
      onOk={onConfirm}
    >
      <Flex vertical gap={20}>
        <Flex justify="left" gap={20}>
          <FormLabel title="Description" width={labelWidth} />
          <Text>{updateValues.description}</Text>
        </Flex>
        <Flex justify="left" gap={20}>
          <FormLabel title="Code" width={labelWidth} />
          <Text>{updateValues.code}</Text>
        </Flex>
        <Flex gap={20}>
          <Flex justify="left" gap={20} align="center">
            <FormLabel title="Design Code" width={labelWidth} required />
            <Input
              onChange={(e) => updateValues.designCode.onChange(e.target.value)}
              value={updateValues.designCode.value}
            />
          </Flex>
          <Flex justify="left" gap={20} align="center">
            <FormLabel title="Color Code" required />
            <Input
              onChange={(e) => updateValues.colorCode.onChange(e.target.value)}
              value={updateValues.colorCode.value}
            />
          </Flex>
          <Flex justify="left" gap={20} align="center">
            <FormLabel title="Size" required />
            <Input
              onChange={(e) => updateValues.size.onChange(e.target.value)}
              value={updateValues.size.value}
            />
          </Flex>
          <Flex justify="left" gap={20} align="center">
            <FormLabel title="Width" required />
            <Input
              onChange={(e) => updateValues.width.onChange(e.target.value)}
              value={updateValues.width.value}
            />
          </Flex>
        </Flex>
        <Flex gap={20}>
          <Flex justify="left" gap={20} align="center">
            <FormLabel title="Holes" required width={labelWidth} />
            <Input
              onChange={(e) => updateValues.holes.onChange(e.target.value)}
              value={updateValues.holes.value}
            />
          </Flex>
          <Flex justify="left" gap={20} align="center">
            <FormLabel title="PCD" required />
            <Input
              onChange={(e) => updateValues.pcd.onChange(e.target.value)}
              value={updateValues.pcd.value}
            />
          </Flex>
          <Flex justify="left" gap={20} align="center">
            <FormLabel title="ET" required />
            <Input
              onChange={(e) => updateValues.et.onChange(e.target.value)}
              value={updateValues.et.value}
            />
          </Flex>
          <Flex justify="left" gap={20} align="center">
            <FormLabel title="CB" required />
            <Input
              onChange={(e) => updateValues.cb.onChange(e.target.value)}
              value={updateValues.cb.value}
            />
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};
