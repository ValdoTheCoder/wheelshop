import {
  Button,
  Flex,
  Popconfirm,
  Popover,
  Space,
  Switch,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { ActiveType, PAGE_SIZE, Wheel } from "../../data-access/wheels";
import { ColumnsType } from "antd/es/table";
import "./ResultTable.css";
import {
  EditOutlined,
  FormOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import { DataType, getRowClassForRow, mapResultsToDataType } from "./helpers";

const { Text } = Typography;

export interface ResultTableProps {
  paginationTotal: number;
  currentPage: number;
  results: Array<Wheel>;
  isOverlay: boolean;
  isLoading?: boolean;
  isAllState: boolean;
  isActivationLoading?: boolean;
  onToggleActivate: (code: string, status: ActiveType) => void;
  onRemove: (code: string) => void;
  onUpdate: (code: string) => void;
  onOpenNote: (code: string, notes?: string) => void;
  onDelete: (code: string) => void;
  onPageChange: (page: number) => void;
}

export const ResultTable: React.FC<ResultTableProps> = ({
  paginationTotal,
  currentPage,
  results,
  isOverlay,
  isLoading,
  isAllState,
  isActivationLoading,
  onToggleActivate,
  onRemove,
  onUpdate,
  onOpenNote,
  onDelete,
  onPageChange,
}) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "Design Code",
      dataIndex: "designCode",
      key: "designCode",
      align: "center",
      width: 140,
    },
    {
      title: "Color Code",
      dataIndex: "colorCode",
      key: "colorCode",
      align: "center",
      width: 140,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      align: "center",
      width: 100,
    },
    {
      title: "Width",
      dataIndex: "width",
      key: "width",
      align: "center",
      width: 100,
    },
    {
      title: "Holes",
      dataIndex: "holes",
      key: "holes",
      align: "center",
      width: 100,
    },
    {
      title: "PCD",
      dataIndex: "pcd",
      key: "pcd",
      align: "center",
      width: 100,
    },
    {
      title: "ET",
      dataIndex: "et",
      key: "et",
      width: 100,
      align: "center",
    },
    {
      title: "CB",
      dataIndex: "cb",
      key: "cb",
      align: "center",
      width: 100,
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      width: 80,
      align: "center",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      align: "center",
      width: 100,
      render: (_, { code, isActive }) => {
        const title =
          isActive === "ACTIVE"
            ? "Suspend or remove this entry?"
            : isActive === "SUSPENDED" && !isAllState
            ? "Activate or remove this entry?"
            : "Activate this entry?";
        const okText = isActive === "ACTIVE" ? "Suspend" : "Activate";
        const newStatus = isActive === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

        return (
          <Flex gap={10} align="center" justify="center">
            <Popconfirm
              title={title}
              onConfirm={() => onToggleActivate(code, newStatus)}
              okText={okText}
              showCancel={!isAllState || isActive === "ACTIVE"}
              cancelText="Remove"
              okButtonProps={{
                loading: isActivationLoading,
                icon:
                  isActive === "ACTIVE" ? (
                    <PauseCircleOutlined />
                  ) : (
                    <CheckCircleOutlined />
                  ),
              }}
              cancelButtonProps={{
                onClick: () => onRemove(code),
                icon: <CloseCircleOutlined />,
              }}
              destroyTooltipOnHide
            >
              <Switch
                checked={isActive === "ACTIVE"}
                disabled={isActivationLoading}
              />
            </Popconfirm>
          </Flex>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 200,
      render: (_, { code, notes, modifier }) => {
        return (
          <div className="result-actions">
            <div className="row-action-space">
              <Tooltip title="Edit entry">
                <Button
                  type="text"
                  onClick={() => onUpdate(code)}
                  icon={<EditOutlined />}
                />
              </Tooltip>
            </div>
            <div className="row-action-space">
              <Tooltip title="Edit entry notes">
                <Button
                  type="text"
                  icon={<FormOutlined />}
                  onClick={() => onOpenNote(code, notes)}
                />
              </Tooltip>
            </div>
            <div className="row-action-space">
              {notes ? (
                <Popover title="Notes" content={notes}>
                  <InfoCircleOutlined style={{ padding: 9 }} />
                </Popover>
              ) : null}
            </div>
            <div className="row-action-space">
              {modifier === "CUSTOM" ? (
                <Tooltip title="Remove entry from database">
                  <Popconfirm
                    title="Delete Selected Entry"
                    okText="Delete"
                    okType="danger"
                    onConfirm={() => onDelete(code)}
                  >
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined className="row-delete-icon" />}
                    />
                  </Popconfirm>
                </Tooltip>
              ) : null}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={mapResultsToDataType(results)}
      pagination={{
        pageSize: PAGE_SIZE,
        current: currentPage,
        total: paginationTotal,
        showSizeChanger: false,
        showTotal: (total) => (
          <Space>
            <Text strong>Total Found:</Text>
            <Text>{total}</Text>
          </Space>
        ),
        size: "small",
        position: ["bottomCenter"],
        onChange: onPageChange,
      }}
      scroll={{
        y: "calc(100vh - 227px)",
      }}
      size="small"
      loading={isLoading}
      className="table"
      rowClassName={isOverlay ? (row) => getRowClassForRow(row) : undefined}
    />
  );
};

export default ResultTable;
