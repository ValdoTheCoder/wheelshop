import React, { useCallback } from "react";
import { ConfigProvider, notification, theme } from "antd";
import { useActor } from "@xstate/react";
import Page from "../ui/Page/Page";
import { machine } from "../machines/machine";
import { interpret } from "xstate";
import { inspect } from "@xstate/inspect";
import ModalsContainer from "./ModalsContainer";
import { ActiveType } from "../data-access/wheels";

const isDebugMode = process.env.REACT_APP_DEBUG === "true";

if (isDebugMode)
  inspect({
    iframe: false,
    serialize: (_key, value) => {
      if (value instanceof Map) value = Object.fromEntries(value.entries());
      return value;
    },
  });

const machineInstance = interpret(machine, {
  devTools: isDebugMode,
}).start();

const AppContainer: React.FC = () => {
  const [machineState, sendMachine] = useActor(machineInstance);

  const {
    findParams,
    overlay,
    inventoryLoadTime,
    totalEntries,
    activeTotal,
    suspendedTotal,
    paginationTotal,
    currentPage,
  } = machineState.context;

  const isStockLoading = machineState.matches("loadingStock");
  const isWheelsLoading = machineState.matches("loadingWheels");

  const onToggleActivate = useCallback(
    (code: string, status: ActiveType) => {
      sendMachine({
        type: "activate",
        payload: {
          code,
          isActive: status,
        },
      });
    },
    [sendMachine]
  );

  const onPageChange = useCallback(
    (page: number) => sendMachine({ type: "change.page", page }),
    [sendMachine]
  );

  const onOpenNote = useCallback(
    (code: string, notes?: string) =>
      sendMachine({
        type: "open.note.modal",
        code,
        notes,
      }),
    [sendMachine]
  );

  const onRemove = useCallback(
    (code: string) => {
      sendMachine({ type: "remove.activated", code });
    },
    [sendMachine]
  );

  const onUpdate = useCallback(
    (code: string) => {
      sendMachine({ type: "open.update", code });
    },
    [sendMachine]
  );

  const onDelete = useCallback(
    (code: string) => sendMachine({ type: "delete.entry", code }),
    [sendMachine]
  );

  const isClearFiltersDisabled =
    !findParams?.designCode &&
    !findParams?.colorCode &&
    !findParams?.pcd &&
    !findParams?.size &&
    !findParams?.holes;

  notification.config({
    placement: "bottomLeft",
    duration: 2,
    rtl: false,
    closeIcon: false,
  });

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#1554ad",
          colorText: "#ccc",
        },
        components: {
          Spin: {
            dotSizeLG: 60,
          },
          Table: {
            rowHoverBg: overlay ? "none" : "#1f1f1f",
          },
        },
      }}
    >
      <Page
        headerProps={{
          isStockLoading,
          isWheelsLoading,
          inventoryLoadTime,
          totalEntries,
          activeTotal,
          suspendedTotal,
          onLoadWheels: () => sendMachine({ type: "load.wheels" }),
          onLoad: () => sendMachine({ type: "load.stock" }),
          onCreateOpen: () => sendMachine({ type: "open.create" }),
        }}
        resultTableProps={{
          isAllState: !findParams?.isActive,
          currentPage,
          paginationTotal: paginationTotal,
          onPageChange,
          results: Array.from(machineState.context.wheels.values()),
          isLoading: machineState.matches("loading"),
          isActivationLoading: machineState.matches("activating"),
          onToggleActivate,
          isOverlay: overlay,
          onUpdate,
          onRemove,
          onOpenNote,
          onDelete,
        }}
        filtersProps={{
          isClearFiltersDisabled,
          onSearch: () => sendMachine({ type: "search" }),
          onFilterClear: () => sendMachine({ type: "clear.filters" }),
          designCode: {
            value: findParams?.designCode,
            onChange: (code) =>
              sendMachine({
                type: "merge.find.params",
                findParams: { designCode: code },
              }),
          },
          colorCode: {
            value: findParams?.colorCode,
            onChange: (code) =>
              sendMachine({
                type: "merge.find.params",
                findParams: { colorCode: code },
              }),
          },
          pcd: {
            value: findParams?.pcd,
            onChange: (pcd) =>
              sendMachine({
                type: "merge.find.params",
                findParams: { pcd },
              }),
          },
          overlay: {
            value: overlay,
            onChange: (status) =>
              sendMachine({ type: "toggle.overlay", status }),
          },
          size: {
            value: findParams?.size,
            onChange: (size) =>
              sendMachine({ type: "search", findParams: { size } }),
          },
          holes: {
            value: findParams?.holes,
            onChange: (holes) =>
              sendMachine({ type: "search", findParams: { holes } }),
          },
          activeFilter: {
            value: findParams?.isActive ?? "ALL",
            onChange: (state) =>
              sendMachine({
                type: "search",
                findParams: { isActive: state === "ALL" ? undefined : state },
              }),
          },
        }}
        isFullLoading={isWheelsLoading || isStockLoading}
      />
      <ModalsContainer machineRef={machineInstance} />
    </ConfigProvider>
  );
};

export default AppContainer;
