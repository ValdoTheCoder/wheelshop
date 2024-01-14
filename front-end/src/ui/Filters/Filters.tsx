import {
  Button,
  Flex,
  Input,
  Radio,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import React from "react";
import "./Filters.css";
import {
  ActiveStates,
  holesOptions,
  radioOptions,
  sizeOptions,
} from "../../utils/utils";
import { ReloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

export interface FiltersProps {
  isClearFiltersDisabled: boolean;
  onSearch: () => void;
  onFilterClear: () => void;
  designCode: {
    value?: string;
    onChange: (value?: string) => void;
  };
  colorCode: {
    value?: string;
    onChange: (value?: string) => void;
  };
  overlay: {
    value: boolean;
    onChange: (value: boolean) => void;
  };
  size: {
    value?: string;
    onChange: (size?: string) => void;
  };
  holes: {
    value?: string;
    onChange: (holes?: string) => void;
  };
  pcd: {
    value?: string;
    onChange: (pcd?: string) => void;
  };
  activeFilter: {
    value: ActiveStates;
    onChange: (value: ActiveStates) => void;
  };
}

export const Filters: React.FC<FiltersProps> = ({
  isClearFiltersDisabled,
  onSearch,
  onFilterClear,
  designCode,
  colorCode,
  overlay,
  size,
  holes,
  pcd,
  activeFilter,
}) => {
  return (
    <Flex className="filters" justify="space-between">
      <Flex gap={20}>
        <Space>
          <Text>Design Code</Text>
          <Input
            onChange={(e) => {
              const val = e.target.value;
              if (e.type === "click") {
                designCode.onChange(undefined);
                onSearch();
              }
              if (val === "") designCode.onChange(undefined);
              else designCode.onChange(val);
            }}
            onPressEnter={onSearch}
            value={designCode.value}
            placeholder="Enter Design Code"
            allowClear
          />
        </Space>
        <Space>
          <Text>Color Code</Text>
          <Input
            onChange={(e) => {
              const val = e.target.value;
              if (e.type === "click") {
                colorCode.onChange(undefined);
                onSearch();
              }
              if (val === "") colorCode.onChange(undefined);
              else colorCode.onChange(val);
            }}
            onPressEnter={onSearch}
            value={colorCode.value}
            placeholder="Enter Color Code"
            allowClear
          />
        </Space>
        <Select
          value={size.value}
          onChange={size.onChange}
          options={sizeOptions()}
          placeholder="Size"
          className="filters-size"
          allowClear
        />
        <Select
          options={holesOptions}
          value={holes.value}
          onChange={holes.onChange}
          placeholder="Holes"
          className="filters-holes"
          allowClear
        />
        <Space>
          <Text>PCD</Text>
          <Input
            onChange={(e) => {
              const val = e.target.value;
              if (e.type === "click") {
                pcd.onChange(undefined);
                onSearch();
              }
              if (val === "") pcd.onChange(undefined);
              else pcd.onChange(val);
            }}
            onPressEnter={onSearch}
            value={pcd.value}
            placeholder="Enter PCD"
            className="filters-pcd"
            allowClear
          />
        </Space>
        <Button
          icon={<ReloadOutlined />}
          onClick={onFilterClear}
          type="primary"
          disabled={isClearFiltersDisabled}
        />
      </Flex>
      <Radio.Group
        options={radioOptions}
        optionType="button"
        value={activeFilter.value}
        onChange={(e) => activeFilter.onChange(e.target.value)}
        buttonStyle="solid"
      />
      <Switch
        checked={overlay.value}
        onChange={overlay.onChange}
        checkedChildren="Overlay ON"
        unCheckedChildren="Overlay OFF"
      />
    </Flex>
  );
};

export default Filters;
