import { ActorRefFrom, assign, createMachine } from "xstate";
import {
  ActivateResponse,
  CreateRequest,
  DeleteResponse,
  FindRequest,
  FindResponse,
  UpdateDatabaseResponse,
  UpdateRequest,
  Wheel,
  activateEntry,
  createEntry,
  deleteEntry,
  find,
  removeActivated,
  update,
  updateDatabase,
} from "../data-access/wheels";
import { updateNotes } from "../data-access/notes";
import { notification } from "antd";
import { Metadata, getMetadata } from "../data-access/metadata";

interface ActivatePayload {
  code: string;
  isActive: string;
}

type UpdatePayload = Omit<Wheel, "id" | "isActive">;

export interface MachineContext {
  wheels: Map<string, Wheel>;
  currentPage: number;
  paginationTotal: number;
  stockLoadTime?: string;
  entryToActivate?: ActivatePayload;
  findParams?: FindRequest;
  overlay: boolean;
  entryToUpdate?: Wheel;
  entryToUpdateDraft?: Wheel;
  inventoryLoadTime?: string;
  totalEntries?: number;
  activeTotal?: number;
  suspendedTotal?: number;
  codeToUpdate?: string;
  initialNote?: string;
  noteDraft?: string;
  createDraft?: CreateRequest;
}

export type MachineEvents =
  | { type: "close" }
  | { type: "confirm" }
  | { type: "load.metadata" }
  | { type: "update.database" }
  | { type: "open.create" }
  | { type: "change.create"; payload: Partial<CreateRequest> }
  | { type: "open.update"; code: string }
  | { type: "change.update.entry"; payload: Partial<UpdatePayload> }
  | { type: "open.note.modal"; code: string; notes?: string }
  | { type: "change.note"; note: string }
  | { type: "remove.note" }
  | { type: "activate"; payload: ActivatePayload }
  | { type: "remove.activated"; code: string }
  | { type: "toggle.overlay"; status: boolean }
  | { type: "search"; findParams?: FindRequest }
  | { type: "merge.find.params"; findParams?: FindRequest }
  | { type: "clear.filters" }
  | { type: "change.page"; page: number }
  | { type: "delete.entry"; code: string };

export type MachinesServices = {
  getEntriesService: { data: FindResponse };
  activateService: { data: ActivateResponse };
  updateEntryService: { data: Wheel };
  getMetadataService: { data: Metadata };
  notePersistService: { data: Wheel };
  createService: { data: void };
  deleteEntryService: { data: DeleteResponse };
  removeActivatedService: { data: DeleteResponse };
  updateDatabaseService: { data: UpdateDatabaseResponse };
};

export type MachineRef = ActorRefFrom<typeof machine>;

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDoAbAe1QjygGIIT8C8A3Ega0LSz0NPMoSZLpUAF2x0A2gAYAulOmJQABxKxsougpAAPRACYAnLoIBWSWbOndAZl0AWABy2ANCACeiAIz2AbAW8B2fW97e0lvWw8PKy8AXxiXDhx6HgpcajAAJwySDIJFIhEAMxzkAkSuYjJUqH5cZiF1XDk5TWVVRs0dBG8PAi9-W319Kx9vb107F3cERwJdbytJXUjBq39JfQ84hIwkwmwIIjAqFJakEDa1MVxOxAjfe2Nh4xC1jej-Kc8rXw9AgI8kn83iGg282xA5XoByOVAwokYIjAZyUKiuGnOXSe+gIQXswMktgmjmMnzcejMuLCumMC1pUQGughUMI8OwiNEaRodH2dVY7F2FTZHL4Aga12aMlaaI6mMQ3kJBAGQxCQNsiz+XxmvUGQ30xlskg8+nVHiZ8UhgvowpElComWyuXyRRKZStrPQCNtaVq9VtEhkKIuMuutxm1j87z1hMN+jJ0w8pj8Nn+QJ+m2CcQtuBIEDgmhZ0vaoblCAAtB4tWXfOZa3WzP5me7Krw0kX0TdS7Z4557EZlj0HGsFcPGxaWQxDmB27LQFjAbjgv5jMYrD8rAaxlqBwRCSb9JIRvqbN5jE3ONbPezvVAZyW54hQjiicaLH8BgNt4e+inNon-P4BhmlmMRAA */
    id: "machine",
    schema: {
      events: {} as MachineEvents,
      context: {} as MachineContext,
      services: {} as MachinesServices,
    },
    predictableActionArguments: true,
    context: {
      wheels: new Map(),
      overlay: false,
      paginationTotal: 0,
      currentPage: 1,
    },
    tsTypes: {} as import("./machine.typegen").Typegen0,
    initial: "loadingMetadata",
    states: {
      loadingMetadata: {
        invoke: {
          src: "getMetadataService",
          onDone: {
            target: "loading",
            actions: "assignMetadata",
          },
        },
      },
      loading: {
        invoke: {
          src: "getEntriesService",
          onDone: {
            target: "idle",
            actions: "assignWheels",
          },
          onError: {},
        },
      },
      idle: {
        id: "idle",
        on: {
          activate: {
            target: "activating",
            actions: "assignEntryToActivate",
          },
          "update.database": "updatingDatabase",
          "toggle.overlay": {
            actions: "toggleOverlay",
          },
          "open.update": {
            target: "updateMode",
            actions: "assignEntryToUpdate",
          },

          "open.note.modal": {
            target: "noteModal",
            actions: ["assignCodeToBeUpdated", "assignInitialNotes"],
          },
          "open.create": {
            target: "createMode",
            actions: "initializeCreateDraft",
          },
          "delete.entry": "deleting",
          "change.page": {
            target: "loading",
            actions: "assignPage",
          },
          "remove.activated": "removingActivated",
          search: {
            actions: ["assignFindParams", "resetPageCounter"],
            target: "loading",
          },
          "merge.find.params": {
            actions: "assignFindParams",
          },
          "clear.filters": {
            target: "loading",
            actions: "assignClearedFilters",
          },
        },
      },
      updatingDatabase: {
        invoke: {
          src: "updateDatabaseService",
          onDone: {
            target: "idle",
            actions: "assignUpdatedDatabaseMetadata",
          },
          onError: {
            target: "idle",
            actions: "notifyError",
          },
        },
      },
      updateMode: {
        initial: "entry",
        states: {
          entry: {
            on: {
              close: { target: "#idle", actions: "clearUpdateValues" },
              "change.update.entry": {
                actions: "assignEntryUpdate",
              },
              confirm: "updating",
            },
          },
          updating: {
            invoke: {
              src: "updateEntryService",
              onDone: {
                target: "#idle",
                actions: [
                  "assignUpdatedEntry",
                  "notifySuccess",
                  "clearUpdateValues",
                ],
              },
              onError: {
                target: "entry",
                actions: "notifyError",
              },
            },
          },
        },
      },
      createMode: {
        initial: "entry",
        states: {
          entry: {
            on: {
              close: {
                target: "#idle",
                actions: "clearCreateDraft",
              },
              "change.create": {
                actions: "assignCreateDraft",
              },
              confirm: "persisting",
            },
          },
          persisting: {
            invoke: {
              src: "createService",
              onDone: {
                target: "#idle",
                actions: "notifySuccess",
              },
              onError: {
                target: "entry",
                actions: "notifyError",
              },
            },
          },
        },
      },
      noteModal: {
        initial: "entry",
        states: {
          entry: {
            on: {
              confirm: {
                target: "persisting",
              },
              close: {
                target: "#idle",
                actions: "clearNotes",
              },
              "change.note": {
                actions: "assignNote",
              },
              "remove.note": {
                target: "persisting",
                actions: ["clearNotes"],
              },
            },
          },
          persisting: {
            invoke: {
              src: "notePersistService",
              onDone: {
                target: "#idle",
                actions: [
                  "notifySuccess",
                  "assignUpdatedEntry",
                  "clearCodeToUpdate",
                  "clearNotes",
                ],
              },
              onError: {
                target: "entry",
                actions: "notifyError",
              },
            },
          },
        },
      },
      deleting: {
        invoke: {
          src: "deleteEntryService",
          onDone: {
            target: "idle",
            actions: ["notifySuccess", "deleteEntryFromContext"],
          },
          onError: {
            target: "idle",
            actions: "notifyError",
          },
        },
      },
      activating: {
        invoke: {
          src: "activateService",
          onDone: {
            target: "idle",
            actions: [
              "clearEntryToActivate",
              "assignUpdatedWheel",
              "assignActiveAndSuspendedTotal",
              "notifySuccess",
            ],
          },
          onError: {
            actions: "notifyError",
          },
        },
      },
      removingActivated: {
        invoke: {
          src: "removeActivatedService",
          onDone: [
            {
              cond: "isAllMode",
              target: "#idle",
              actions: ["notifySuccess", "deactivateEntryInContext"],
            },
            {
              target: "#idle",
              actions: ["notifySuccess", "deleteEntryFromContext"],
            },
          ],
          onError: {
            target: "#idle",
            actions: "notifyError",
          },
        },
      },
    },
  },
  {
    actions: {
      /*
          Assign Actions
      */
      assignWheels: assign((_ctx, evt) => ({
        wheels: new Map(
          evt.data.paginatedData.map((wheel) => [wheel.code, wheel])
        ),
        paginationTotal: evt.data.total,
      })),
      assignEntryToActivate: assign((_ctx, evt) => ({
        entryToActivate: evt.payload,
      })),
      assignUpdatedWheel: assign((ctx, evt) => {
        if (
          ctx.findParams?.isActive === "ACTIVE" ||
          ctx.findParams?.isActive === "SUSPENDED"
        ) {
          const newWheelsMap = new Map(ctx.wheels);
          newWheelsMap.delete(evt.data.wheel.code);
          return { wheels: newWheelsMap };
        }
        return { wheels: ctx.wheels.set(evt.data.wheel.code, evt.data.wheel) };
      }),
      clearEntryToActivate: assign((_ctx) => ({
        entryToActivate: undefined,
      })),
      assignFindParams: assign((ctx, evt) => ({
        findParams: {
          ...ctx.findParams,
          ...evt.findParams,
        },
      })),
      assignEntryToUpdate: assign((ctx, evt) => {
        const wheel = ctx.wheels.get(evt.code);
        return { entryToUpdate: wheel, entryToUpdateDraft: wheel };
      }),
      assignEntryUpdate: assign((ctx, evt) => {
        if (!ctx.entryToUpdateDraft)
          throw new Error(
            "assignEntryUpdate invoked without entryToUpdateDraft in context"
          );
        return {
          entryToUpdateDraft: {
            ...ctx.entryToUpdateDraft,
            ...evt.payload,
          },
        };
      }),
      assignUpdatedEntry: assign((ctx, evt) => ({
        wheels: ctx.wheels.set(evt.data.code, evt.data),
      })),
      assignMetadata: assign((_ctx, evt) => ({
        inventoryLoadTime: evt.data.updatedTime,
        activeTotal: evt.data.activeTotal ?? 0,
        suspendedTotal: evt.data.suspendedTotal ?? 0,
        totalEntries: evt.data.total,
      })),
      assignActiveAndSuspendedTotal: assign((_ctx, evt) => ({
        activeTotal: evt.data.activeTotal,
        suspendedTotal: evt.data.suspendedTotal,
      })),
      assignUpdatedDatabaseMetadata: assign((_ctx, evt) => ({
        inventoryLoadTime: evt.data.time,
        totalEntries: evt.data.total,
      })),
      assignNote: assign((_ctx, evt) => ({
        noteDraft: evt.note,
      })),
      assignCodeToBeUpdated: assign((_ctx, evt) => ({
        codeToUpdate: evt.code,
      })),
      assignInitialNotes: assign((_ctx, evt) => ({
        initialNote: evt.notes,
        noteDraft: evt.notes,
      })),
      assignCreateDraft: assign((ctx, evt) => {
        if (!ctx.createDraft)
          throw new Error("assignCreateDraft invoked without createDraft");
        return { createDraft: { ...ctx.createDraft, ...evt.payload } };
      }),
      assignPage: assign((_ctx, evt) => ({
        currentPage: evt.page,
      })),
      assignClearedFilters: assign((ctx) => ({
        findParams: { isActive: ctx.findParams?.isActive },
      })),
      resetPageCounter: assign((_ctx) => ({
        currentPage: 1,
      })),
      deleteEntryFromContext: assign((ctx, evt) => {
        const newWheelsMap = new Map(
          [...ctx.wheels].filter(([i]) => i !== evt.data.code)
        );
        return {
          wheels: newWheelsMap,
          activeTotal: evt.data.activeTotal,
          suspendedTotal: evt.data.suspendedTotal,
        };
      }),
      deactivateEntryInContext: assign((ctx, evt) => {
        const entryToUpdate = ctx.wheels.get(evt.data.code);
        if (!entryToUpdate)
          throw new Error("deactivateEntryInContext invoked without wheel");
        const newWheelsMap = new Map(ctx.wheels);
        newWheelsMap.set(evt.data.code, {
          ...entryToUpdate,
          isActive: null,
        });
        return { wheels: newWheelsMap };
      }),

      /*
          Notify Actions
      */
      notifySuccess: () =>
        notification.success({
          message: "Success",
          description: "Your event succeeded",
        }),
      notifyError: () =>
        notification.error({
          message: "Error",
          description: "Something went wrong",
        }),

      /*
          Clear actions
      */
      clearUpdateValues: assign((_ctx) => ({
        entryToUpdate: undefined,
        entryToUpdateDraft: undefined,
      })),
      clearCodeToUpdate: assign((_ctx) => ({
        codeToUpdate: undefined,
      })),

      clearNotes: assign((_ctx) => ({
        initialNote: undefined,
        noteDraft: undefined,
      })),
      clearCreateDraft: assign((_ctx) => ({
        createDraft: undefined,
      })),

      initializeCreateDraft: assign((_ctx) => ({
        createDraft: {
          description: "",
          code: "",
          designCode: "",
          colorCode: "",
          size: "",
          width: "",
          holes: "",
          pcd: "",
          et: "",
          cb: "",
        },
      })),
      toggleOverlay: assign((_ctx, evt) => ({
        overlay: evt.status,
      })),
    },
    services: {
      getEntriesService: (ctx) => find(ctx.currentPage, ctx.findParams),
      activateService: (ctx) => {
        if (!ctx.entryToActivate)
          throw new Error(
            "activateService invoked without entryToActivate in context"
          );

        if (
          ctx.findParams?.isActive === "ACTIVE" ||
          ctx.findParams?.isActive === "SUSPENDED"
        ) {
        }

        return activateEntry(
          ctx.entryToActivate.code,
          ctx.entryToActivate.isActive
        );
      },
      updateEntryService: (ctx) => {
        if (!ctx.entryToUpdateDraft)
          throw new Error(
            "updateEntryService invoked without entryToUpdateDraft"
          );
        return update(mapWheelToUpdateRequest(ctx.entryToUpdateDraft));
      },
      getMetadataService: () => getMetadata(),
      notePersistService: (ctx) => {
        if (!ctx.codeToUpdate)
          throw new Error("notePersistService invoked without codeToUpdate");
        return updateNotes({ code: ctx.codeToUpdate, notes: ctx.noteDraft });
      },
      createService: (ctx) => {
        if (!ctx.createDraft)
          throw new Error("createService invoked without createDraft");
        return createEntry(ctx.createDraft);
      },
      deleteEntryService: (_ctx, evt) => deleteEntry(evt.code),
      removeActivatedService: (_ctx, evt) => removeActivated(evt.code),
      updateDatabaseService: () => updateDatabase(),
    },
    guards: {
      isAllMode: (ctx) => !ctx.findParams?.isActive,
    },
  }
);

export default machine;

const mapWheelToUpdateRequest = (w: Wheel): UpdateRequest => ({
  code: w.code,
  designCode: w.designCode,
  colorCode: w.colorCode,
  size: w.size,
  width: w.width,
  holes: w.holes,
  pcd: w.pcd,
  et: w.et,
  cb: w.cb,
});
