// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.modalsMachine.noteModal.persisting:invocation[0]": {
      type: "done.invoke.modalsMachine.noteModal.persisting:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.modalsMachine.noteModal.persisting:invocation[0]": {
      type: "error.platform.modalsMachine.noteModal.persisting:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    notePersistService: "done.invoke.modalsMachine.noteModal.persisting:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    assignCodeToUpdate: "open.notes";
    assingNote: "change.note";
    clearCodeToUpdate: "close";
    clearNote: "close";
    notifyNoteError: "error.platform.modalsMachine.noteModal.persisting:invocation[0]";
    notifyNoteSaved: "done.invoke.modalsMachine.noteModal.persisting:invocation[0]";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    notePersistService: "confirm";
  };
  matchesStates:
    | "idle"
    | "noteModal"
    | "noteModal.entry"
    | "noteModal.persisting"
    | "updateModal"
    | { noteModal?: "entry" | "persisting" };
  tags: never;
}
