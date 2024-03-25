import { create } from "zustand";

interface EventLog {
    timestamp: string;
    eventType: string;
}

interface LogsState {
    eventTypes: EventLog[];
}

interface LogsActions {
    addEventType: (eventType: EventLog) => void;
}

export const useLogsStore = create<LogsState & LogsActions>((set) => ({
    eventTypes: [],
    addEventType: (eventType) =>
        set((prevState) => ({
            eventTypes: [...prevState.eventTypes, eventType],
        })),
}));
