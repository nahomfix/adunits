import Alert from "@mui/material/Alert";
import { FC } from "react";
import { useChecklistStore } from "../store";

interface LogProps {
    eventType: string;
    timestamp: string;
}

export const Log: FC<LogProps> = ({ eventType, timestamp }) => {
    const checklist = useChecklistStore((state) => state.list);

    const getStatusColor = (eventType: string) => {
        if (!checklist[eventType]["touched"]) return "info";

        if (
            checklist[eventType]["enabled"] &&
            checklist[eventType]["triggered"]
        ) {
            return "success";
        }

        if (
            checklist[eventType]["enabled"] &&
            !checklist[eventType]["triggered"]
        ) {
            return "error";
        }
    };

    return (
        <Alert variant="filled" severity={getStatusColor(eventType)}>
            {eventType} is triggered at {timestamp}
        </Alert>
    );
};
