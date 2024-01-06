import { Button, Flex, Input, Modal } from "antd";
import React from "react";
import {
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";

export interface NoteModalProps {
  isOpen: boolean;
  isUpdateMode: boolean;
  isSaveDisabled: boolean;
  note: {
    value?: string;
    onChange: (note: string) => void;
  };
  onClose: () => void;
  onConfirm: () => void;
  onDelete: () => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  isUpdateMode,
  isSaveDisabled,
  note,
  onClose,
  onConfirm,
  onDelete,
}) => {
  return (
    <Modal
      title={isUpdateMode ? "Update Note" : "Add Note"}
      open={isOpen}
      onCancel={onClose}
      footer={
        <Flex justify="space-between">
          <Button
            onClick={onDelete}
            disabled={!isUpdateMode}
            icon={<DeleteOutlined />}
            danger
          >
            Delete Note
          </Button>
          <Flex>
            <Button onClick={onClose} icon={<CloseOutlined />}>
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={onConfirm}
              disabled={isSaveDisabled}
              icon={<CheckOutlined />}
            >
              {isUpdateMode ? "Update" : "Add"}
            </Button>
          </Flex>
        </Flex>
      }
      destroyOnClose
    >
      <Input.TextArea
        autoSize={{
          minRows: 3,
          maxRows: 6,
        }}
        value={note.value}
        onChange={(e) => note.onChange(e.target.value)}
      ></Input.TextArea>
    </Modal>
  );
};
