import { Button, Flex, Popconfirm, Popover, Statistic, Typography } from "antd";
import React, { CSSProperties } from "react";
import "./Header.css";
import logo from "./logo_white.png";
import {
  CloudDownloadOutlined,
  DeliveredProcedureOutlined,
  WarningOutlined,
  DownloadOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import AnchorLink from "antd/es/anchor/AnchorLink";
const { Text } = Typography;

export interface HeaderProps {
  isUpdatingDatabase: boolean;
  inventoryLoadTime?: string;
  totalEntries?: number;
  activeTotal?: number;
  suspendedTotal?: number;
  onUpdateDatabase: () => void;
  onCreateOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isUpdatingDatabase,
  inventoryLoadTime,
  totalEntries,
  activeTotal,
  suspendedTotal,
  onUpdateDatabase,
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
      <div className="header-inner">
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
          <div className="header__load-area">
            <Flex className="header__text-space" align="center" vertical>
              <Text type="secondary">Last Inventory Update</Text>
              <Text>{inventoryLoadTime}</Text>
            </Flex>
            <Popconfirm
              title="Are you sure you want to Update Database?"
              description="This will update your current Database and Inventory values."
              icon={<WarningOutlined />}
              okButtonProps={{
                icon: <DownloadOutlined />,
              }}
              cancelButtonProps={{
                icon: <CloseOutlined />,
              }}
              okText="Update"
              onConfirm={onUpdateDatabase}
            >
              <Button
                icon={<CloudDownloadOutlined />}
                type="primary"
                loading={isUpdatingDatabase}
              >
                Update Database
              </Button>
            </Popconfirm>
          </div>
          <Popover content={infoPopoverContent} trigger={["click"]}>
            <InfoCircleOutlined className="header__info-icon" />
          </Popover>
        </Flex>
      </div>
    </div>
  );
};

export default Header;
