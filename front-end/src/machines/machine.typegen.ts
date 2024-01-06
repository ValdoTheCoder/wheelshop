// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.machine.activating:invocation[0]": {
      type: "done.invoke.machine.activating:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.machine.createMode.persisting:invocation[0]": {
      type: "done.invoke.machine.createMode.persisting:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.machine.deleting:invocation[0]": {
      type: "done.invoke.machine.deleting:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.machine.loading:invocation[0]": {
      type: "done.invoke.machine.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.machine.loadingMetadata:invocation[0]": {
      type: "done.invoke.machine.loadingMetadata:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.machine.loadingStock:invocation[0]": {
      type: "done.invoke.machine.loadingStock:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.machine.loadingWheels:invocation[0]": {
      type: "done.invoke.machine.loadingWheels:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.machine.noteModal.persisting:invocation[0]": {
      type: "done.invoke.machine.noteModal.persisting:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.machine.removingActivated:invocation[0]": {
      type: "done.invoke.machine.removingActivated:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.machine.updateMode.updating:invocation[0]": {
      type: "done.invoke.machine.updateMode.updating:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.machine.activating:invocation[0]": {
      type: "error.platform.machine.activating:invocation[0]";
      data: unknown;
    };
    "error.platform.machine.createMode.persisting:invocation[0]": {
      type: "error.platform.machine.createMode.persisting:invocation[0]";
      data: unknown;
    };
    "error.platform.machine.deleting:invocation[0]": {
      type: "error.platform.machine.deleting:invocation[0]";
      data: unknown;
    };
    "error.platform.machine.loadingWheels:invocation[0]": {
      type: "error.platform.machine.loadingWheels:invocation[0]";
      data: unknown;
    };
    "error.platform.machine.noteModal.persisting:invocation[0]": {
      type: "error.platform.machine.noteModal.persisting:invocation[0]";
      data: unknown;
    };
    "error.platform.machine.removingActivated:invocation[0]": {
      type: "error.platform.machine.removingActivated:invocation[0]";
      data: unknown;
    };
    "error.platform.machine.updateMode.updating:invocation[0]": {
      type: "error.platform.machine.updateMode.updating:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    activateService: "done.invoke.machine.activating:invocation[0]";
    createService: "done.invoke.machine.createMode.persisting:invocation[0]";
    deleteEntryService: "done.invoke.machine.deleting:invocation[0]";
    getEntriesService: "done.invoke.machine.loading:invocation[0]";
    getMetadataService: "done.invoke.machine.loadingMetadata:invocation[0]";
    loadStockService: "done.invoke.machine.loadingStock:invocation[0]";
    loadWheelsService: "done.invoke.machine.loadingWheels:invocation[0]";
    notePersistService: "done.invoke.machine.noteModal.persisting:invocation[0]";
    removeActivatedService: "done.invoke.machine.removingActivated:invocation[0]";
    updateEntryService: "done.invoke.machine.updateMode.updating:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    assignActiveAndSuspendedTotal: "done.invoke.machine.activating:invocation[0]";
    assignClearedFilters: "clear.filters";
    assignCodeToBeUpdated: "open.note.modal";
    assignCreateDraft: "change.create";
    assignEntryToActivate: "activate";
    assignEntryToUpdate: "open.update";
    assignEntryUpdate: "change.update.entry";
    assignFindParams: "merge.find.params" | "search";
    assignInitialNotes: "open.note.modal";
    assignInventoryLoadTime: "done.invoke.machine.loadingStock:invocation[0]";
    assignMetadata: "done.invoke.machine.loadingMetadata:invocation[0]";
    assignNote: "change.note";
    assignPage: "change.page";
    assignUpdatedEntry:
      | "done.invoke.machine.noteModal.persisting:invocation[0]"
      | "done.invoke.machine.updateMode.updating:invocation[0]";
    assignUpdatedWheel: "done.invoke.machine.activating:invocation[0]";
    assignWheels: "done.invoke.machine.loading:invocation[0]";
    clearCodeToUpdate: "done.invoke.machine.noteModal.persisting:invocation[0]";
    clearCreateDraft: "close";
    clearEntryToActivate: "done.invoke.machine.activating:invocation[0]";
    clearNotes:
      | "close"
      | "done.invoke.machine.noteModal.persisting:invocation[0]"
      | "remove.note";
    clearUpdateValues:
      | "close"
      | "done.invoke.machine.updateMode.updating:invocation[0]";
    deactivateEntryInContext: "done.invoke.machine.removingActivated:invocation[0]";
    deleteEntryFromContext:
      | "done.invoke.machine.deleting:invocation[0]"
      | "done.invoke.machine.removingActivated:invocation[0]";
    initializeCreateDraft: "open.create";
    notifyError:
      | "error.platform.machine.activating:invocation[0]"
      | "error.platform.machine.createMode.persisting:invocation[0]"
      | "error.platform.machine.deleting:invocation[0]"
      | "error.platform.machine.loadingWheels:invocation[0]"
      | "error.platform.machine.noteModal.persisting:invocation[0]"
      | "error.platform.machine.removingActivated:invocation[0]"
      | "error.platform.machine.updateMode.updating:invocation[0]";
    notifySuccess:
      | "done.invoke.machine.activating:invocation[0]"
      | "done.invoke.machine.createMode.persisting:invocation[0]"
      | "done.invoke.machine.deleting:invocation[0]"
      | "done.invoke.machine.loadingWheels:invocation[0]"
      | "done.invoke.machine.noteModal.persisting:invocation[0]"
      | "done.invoke.machine.removingActivated:invocation[0]"
      | "done.invoke.machine.updateMode.updating:invocation[0]";
    resetPageCounter: "search";
    toggleOverlay: "toggle.overlay";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    isAllMode: "done.invoke.machine.removingActivated:invocation[0]";
  };
  eventsCausingServices: {
    activateService: "activate";
    createService: "confirm";
    deleteEntryService: "delete.entry";
    getEntriesService:
      | "change.page"
      | "clear.filters"
      | "done.invoke.machine.loadingMetadata:invocation[0]"
      | "done.invoke.machine.loadingStock:invocation[0]"
      | "done.invoke.machine.loadingWheels:invocation[0]"
      | "search";
    getMetadataService: "xstate.init";
    loadStockService: "load.stock";
    loadWheelsService: "load.wheels";
    notePersistService: "confirm" | "remove.note";
    removeActivatedService: "remove.activated";
    updateEntryService: "confirm";
  };
  matchesStates:
    | "activating"
    | "createMode"
    | "createMode.entry"
    | "createMode.persisting"
    | "deleting"
    | "idle"
    | "loading"
    | "loadingMetadata"
    | "loadingStock"
    | "loadingWheels"
    | "noteModal"
    | "noteModal.entry"
    | "noteModal.persisting"
    | "removingActivated"
    | "updateMode"
    | "updateMode.entry"
    | "updateMode.updating"
    | {
        createMode?: "entry" | "persisting";
        noteModal?: "entry" | "persisting";
        updateMode?: "entry" | "updating";
      };
  tags: never;
}
