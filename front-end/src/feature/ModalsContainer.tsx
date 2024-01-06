import React from "react";
import { NoteModal } from "../ui/NoteModal/NoteModal";
import { useActor } from "@xstate/react";
import { MachineRef } from "../machines/machine";
import { UpdateModal } from "../ui/UpdateModal/UpdateModal";
import { CreateModal } from "../ui/CreateModal/CreateModal";

export interface ModalsContainerProps {
  machineRef: MachineRef;
}

export const ModalsContainer: React.FC<ModalsContainerProps> = ({
  machineRef,
}) => {
  const [machineState, sendMachine] = useActor(machineRef);

  const {
    initialNote,
    noteDraft,
    entryToUpdate,
    entryToUpdateDraft,
    createDraft,
  } = machineState.context;

  const isCreateDisabled = createDraft
    ? Object.values(createDraft).some((val) => val === "")
    : true;

  return (
    <>
      <UpdateModal
        isOpen={machineState.matches("updateMode")}
        isSaveDisabled={
          JSON.stringify(entryToUpdate) === JSON.stringify(entryToUpdateDraft)
        }
        onClose={() => sendMachine({ type: "close" })}
        onConfirm={() => sendMachine({ type: "confirm" })}
        updateValues={{
          description: entryToUpdateDraft?.fullString ?? "",
          code: entryToUpdateDraft?.code ?? "",
          designCode: {
            value: entryToUpdateDraft?.designCode ?? "",
            onChange: (designCode) =>
              sendMachine({
                type: "change.update.entry",
                payload: { designCode },
              }),
          },
          colorCode: {
            value: entryToUpdateDraft?.colorCode ?? "",
            onChange: (colorCode) =>
              sendMachine({
                type: "change.update.entry",
                payload: { colorCode },
              }),
          },
          size: {
            value: entryToUpdateDraft?.size ?? "",
            onChange: (size) =>
              sendMachine({
                type: "change.update.entry",
                payload: { size },
              }),
          },
          width: {
            value: entryToUpdateDraft?.width ?? "",
            onChange: (width) =>
              sendMachine({
                type: "change.update.entry",
                payload: { width },
              }),
          },
          holes: {
            value: entryToUpdateDraft?.holes ?? "",
            onChange: (holes) =>
              sendMachine({
                type: "change.update.entry",
                payload: { holes },
              }),
          },
          pcd: {
            value: entryToUpdateDraft?.pcd ?? "",
            onChange: (pcd) =>
              sendMachine({
                type: "change.update.entry",
                payload: { pcd },
              }),
          },
          et: {
            value: entryToUpdateDraft?.et ?? "",
            onChange: (et) =>
              sendMachine({
                type: "change.update.entry",
                payload: { et },
              }),
          },
          cb: {
            value: entryToUpdateDraft?.cb ?? "",
            onChange: (cb) =>
              sendMachine({
                type: "change.update.entry",
                payload: { cb },
              }),
          },
        }}
      />
      <CreateModal
        isOpen={machineState.matches("createMode")}
        isCreateDisabled={isCreateDisabled}
        isPersisting={machineState.matches("createMode.persisting")}
        onClose={() => sendMachine({ type: "close" })}
        onCreate={() => sendMachine({ type: "confirm" })}
        createValues={{
          description: {
            value: createDraft?.description ?? "",
            onChange: (description) =>
              sendMachine({ type: "change.create", payload: { description } }),
          },
          code: {
            value: createDraft?.code ?? "",
            onChange: (code) =>
              sendMachine({ type: "change.create", payload: { code } }),
          },
          designCode: {
            value: createDraft?.designCode ?? "",
            onChange: (designCode) =>
              sendMachine({ type: "change.create", payload: { designCode } }),
          },
          colorCode: {
            value: createDraft?.colorCode ?? "",
            onChange: (colorCode) =>
              sendMachine({ type: "change.create", payload: { colorCode } }),
          },
          size: {
            value: createDraft?.size ?? "",
            onChange: (size) =>
              sendMachine({ type: "change.create", payload: { size } }),
          },
          width: {
            value: createDraft?.width ?? "",
            onChange: (width) =>
              sendMachine({ type: "change.create", payload: { width } }),
          },
          holes: {
            value: createDraft?.holes ?? "",
            onChange: (holes) =>
              sendMachine({ type: "change.create", payload: { holes } }),
          },
          pcd: {
            value: createDraft?.pcd ?? "",
            onChange: (pcd) =>
              sendMachine({ type: "change.create", payload: { pcd } }),
          },
          et: {
            value: createDraft?.et ?? "",
            onChange: (et) =>
              sendMachine({ type: "change.create", payload: { et } }),
          },
          cb: {
            value: createDraft?.cb ?? "",
            onChange: (cb) =>
              sendMachine({ type: "change.create", payload: { cb } }),
          },
        }}
      />
      <NoteModal
        isUpdateMode={!!initialNote}
        isOpen={machineState.matches("noteModal")}
        isSaveDisabled={
          !noteDraft || noteDraft === "" || initialNote === noteDraft
        }
        note={{
          value: noteDraft ?? undefined,
          onChange: (note) => sendMachine({ type: "change.note", note }),
        }}
        onClose={() => sendMachine({ type: "close" })}
        onConfirm={() => sendMachine("confirm")}
        onDelete={() => sendMachine({ type: "remove.note" })}
      />
    </>
  );
};

export default ModalsContainer;
