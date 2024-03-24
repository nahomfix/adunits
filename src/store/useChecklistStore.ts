import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChecklistState {
    list: {
        [name: string]: {
            enabled: boolean;
            triggered: boolean;
            touched: boolean;
        };
    };
}

interface ChecklistActions {
    enableEvent: (eventType: string) => void;
    disableEvent: (eventType: string) => void;
    triggerEvent: (eventType: string) => void;
    resetChecklist: () => void;
}

const initialState = {
    list: {
        dom_loading_started: {
            enabled: true,
            triggered: false,
            touched: false,
        },
        dom_loading_interactive: {
            enabled: true,
            triggered: false,
            touched: false,
        },
        dom_loading_complete: {
            enabled: true,
            triggered: false,
            touched: false,
        },
        impression: {
            enabled: true,
            triggered: false,
            touched: false,
        },
        rendered: {
            enabled: true,
            triggered: false,
            touched: false,
        },
        viewed: {
            enabled: true,
            triggered: false,
            touched: false,
        },
        action_type: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        creative_loading_started: {
            enabled: true,
            triggered: false,
            touched: false,
        },
        creative_loading_complete: {
            enabled: true,
            triggered: false,
            touched: false,
        },
        play_again: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        engagement: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        interaction: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        clickthrough: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        frame_change: {
            enabled: true,
            triggered: false,
            touched: false,
        },
        creative_complete: {
            enabled: true,
            triggered: false,
            touched: false,
        },
        mouse_click: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        video_start: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        video_elapsed_time: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        video_mute: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        video_unmute: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        video_pause: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        video_resume: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        video_skip: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        video_close: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        video_end: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        bio_answer: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        user_choice: {
            enabled: false,
            triggered: false,
            touched: false,
        },
        mouse_hover: {
            enabled: false,
            triggered: false,
            touched: false,
        },
    },
};

export const useChecklistStore = create<ChecklistState & ChecklistActions>()(
    persist(
        (set) => ({
            ...initialState,
            enableEvent: (eventType) =>
                set((prevState) => ({
                    list: {
                        ...prevState.list,
                        [eventType]: {
                            enabled: true,
                            triggered: false,
                            touched: false,
                        },
                    },
                })),
            disableEvent: (eventType) =>
                set((prevState) => ({
                    list: {
                        ...prevState.list,
                        [eventType]: {
                            enabled: false,
                            triggered: false,
                            touched: false,
                        },
                    },
                })),
            triggerEvent: (eventType) =>
                set((prevState) => ({
                    list: {
                        ...prevState.list,
                        [eventType]: {
                            ...prevState.list[eventType],
                            triggered: true,
                            touched: true,
                        },
                    },
                })),
            resetChecklist: () =>
                set({
                    ...initialState,
                }),
        }),
        {
            name: "checklist-store",
        }
    )
);
