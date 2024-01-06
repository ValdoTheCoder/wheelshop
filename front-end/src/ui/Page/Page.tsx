import { Spin } from "antd";
import { Filters, FiltersProps } from "../Filters/Filters";
import Header, { HeaderProps } from "../Header/Header";
import ResultTable, { ResultTableProps } from "../ResultTable/ResultTable";

export interface PageProps {
  headerProps: HeaderProps;
  resultTableProps: ResultTableProps;
  filtersProps: FiltersProps;
  isFullLoading: boolean;
}

export const Page: React.FC<PageProps> = ({
  headerProps,
  resultTableProps,
  filtersProps,
  isFullLoading,
}) => {
  return (
    <>
      <Header {...headerProps} />
      <div style={{ maxWidth: 1600, margin: "auto" }}>
        <Filters {...filtersProps} />

        <ResultTable {...resultTableProps} />
      </div>
      <Spin spinning={isFullLoading} fullscreen size="large" />
    </>
  );
};

export default Page;
