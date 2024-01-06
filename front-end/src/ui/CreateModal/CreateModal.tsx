import React from "react";
import "./CreateModal.css";
import { Flex, Input, Modal } from "antd";
import { FormLabel } from "../FormLabel/FormLabel";
import { CreateValues } from "../../utils/types";

export interface CreateModalProps {
  isOpen: boolean;
  isCreateDisabled: boolean;
  isPersisting: boolean;
  onCreate: () => void;
  onClose: () => void;
  createValues: CreateValues;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  isCreateDisabled,
  isPersisting,
  onCreate,
  onClose,
  createValues,
}) => {
  const labelWidth = 100;
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      closeIcon={false}
      title="Create New Wheel"
      okText="Create"
      width={700}
      okButtonProps={{
        disabled: isCreateDisabled,
        loading: isPersisting,
      }}
      onOk={onCreate}
      destroyOnClose
    >
      <Flex className="main-create-flex">
        <Flex className="flex-align">
          <FormLabel title="Description" required width={labelWidth} />
          <Input
            placeholder="Enter description"
            value={createValues.description.value}
            onChange={(e) => createValues.description.onChange(e.target.value)}
          />
        </Flex>
        <Flex className="flex-align">
          <FormLabel title="Code" required width={labelWidth} />
          <Input
            placeholder="Enter code"
            value={createValues.code.value}
            onChange={(e) => createValues.code.onChange(e.target.value)}
          />
        </Flex>
        <Flex className="flex-align">
          <Flex className="flex-align flex-grow">
            <FormLabel title="Design Code" required width={labelWidth} />
            <Input
              placeholder="Enter Design Code"
              value={createValues.designCode.value}
              onChange={(e) => createValues.designCode.onChange(e.target.value)}
            />
          </Flex>
          <Flex className="flex-align flex-grow">
            <FormLabel title="Color Code" required />
            <Input
              placeholder="Enter Color Code"
              value={createValues.colorCode.value}
              onChange={(e) => createValues.colorCode.onChange(e.target.value)}
            />
          </Flex>
        </Flex>
        <Flex className="flex-align">
          <Flex className="flex-align">
            <FormLabel title="Size" required width={labelWidth} />
            <Input
              placeholder="Enter Size"
              value={createValues.size.value}
              onChange={(e) => createValues.size.onChange(e.target.value)}
            />
          </Flex>
          <Flex className="flex-align flex-narrow">
            <FormLabel title="Width" required width={70} />
            <Input
              placeholder="Enter Width"
              value={createValues.width.value}
              onChange={(e) => createValues.width.onChange(e.target.value)}
            />
          </Flex>
          <Flex className="flex-align flex-narrow">
            <FormLabel title="Holes" required width={70} />
            <Input
              placeholder="Enter Holes"
              value={createValues.holes.value}
              onChange={(e) => createValues.holes.onChange(e.target.value)}
            />
          </Flex>
        </Flex>
        <Flex className="flex-align">
          <Flex className="flex-align">
            <FormLabel title="PCD" required width={labelWidth} />
            <Input
              placeholder="Enter PCD"
              value={createValues.pcd.value}
              onChange={(e) => createValues.pcd.onChange(e.target.value)}
            />
          </Flex>
          <Flex className="flex-align flex-narrow">
            <FormLabel title="ET" required width={70} />
            <Input
              placeholder="Enter ET"
              value={createValues.et.value}
              onChange={(e) => createValues.et.onChange(e.target.value)}
            />
          </Flex>
          <Flex className="flex-align flex-narrow">
            <FormLabel title="CB" required width={70} />
            <Input
              placeholder="Enter CB"
              value={createValues.cb.value}
              onChange={(e) => createValues.cb.onChange(e.target.value)}
            />
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};
