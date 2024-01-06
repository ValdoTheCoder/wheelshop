import { Button, Flex, Popconfirm, Popover, Statistic, Typography } from "antd";
import React, { CSSProperties } from "react";
import "./Header.css";
import logo from "./logo_white.png";
import {
  CloudDownloadOutlined,
  DeliveredProcedureOutlined,
  DatabaseOutlined,
  WarningOutlined,
  DownloadOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import AnchorLink from "antd/es/anchor/AnchorLink";
const { Text } = Typography;

export interface HeaderProps {
  isWheelsLoading?: boolean;
  isStockLoading?: boolean;
  inventoryLoadTime?: string;
  totalEntries?: number;
  activeTotal?: number;
  suspendedTotal?: number;
  onLoadWheels: () => void;
  onLoad: () => void;
  onCreateOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isWheelsLoading,
  isStockLoading,
  inventoryLoadTime,
  totalEntries,
  activeTotal,
  suspendedTotal,
  onLoadWheels,
  onLoad,
  onCreateOpen,
}) => {
  const statisticValueStyle: CSSProperties = {
    textAlign: "center",
    fontSize: 18,
  };

  const infoPopoverContent = (
    <Flex vertical gap={10}>
      <Text>Database is being scraper from:</Text>
      <AnchorLink
        title="Wheels 2020"
        href="https://wheels2020.com/index.php?cat=all&lang=EN&size=&holes=&range=&et=&design=&color=&select_wheels=Search"
        target="_blank"
      />
    </Flex>
  );

  return (
    <div className="header">
      <img src={logo} alt="" height={50} />
      <Flex gap={30}>
        <Statistic
          title="Total Wheels"
          value={totalEntries}
          valueStyle={statisticValueStyle}
        />
        <Statistic
          title="Active"
          value={activeTotal}
          valueStyle={statisticValueStyle}
        />
        <Statistic
          title="Suspended"
          value={suspendedTotal}
          valueStyle={statisticValueStyle}
        />
      </Flex>
      <Flex gap={20} align="center">
        <Button
          onClick={onCreateOpen}
          type="primary"
          icon={<DeliveredProcedureOutlined />}
        >
          Manual Entry
        </Button>
        <Popconfirm
          title="Are you sure you want to update Database?"
          description="Changes made to current entries will be lost."
          icon={<WarningOutlined />}
          okButtonProps={{
            icon: <DownloadOutlined />,
          }}
          cancelButtonProps={{
            icon: <CloseOutlined />,
          }}
          okText="Update"
          onConfirm={onLoadWheels}
        >
          <Button
            type="primary"
            icon={<DatabaseOutlined />}
            loading={isWheelsLoading}
          >
            Update Database
          </Button>
        </Popconfirm>
        <div className="header__load-area">
          <Flex className="header__text-space" align="center" vertical>
            <Text type="secondary">Last Inventory Update</Text>
            <Text>{inventoryLoadTime}</Text>
          </Flex>
          <Popconfirm
            title="Are you sure you want to load stock?"
            description="This will update your current stock values."
            icon={<WarningOutlined />}
            okButtonProps={{
              icon: <DownloadOutlined />,
            }}
            cancelButtonProps={{
              icon: <CloseOutlined />,
            }}
            okText="Load"
            onConfirm={onLoad}
          >
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              loading={isStockLoading}
            >
              Load Stock
            </Button>
          </Popconfirm>
        </div>
        <Popover content={infoPopoverContent} trigger={["click"]}>
          <InfoCircleOutlined className="header__info-icon" />
        </Popover>
      </Flex>
    </div>
  );
};

export default Header;
