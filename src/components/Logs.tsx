import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLogsStore } from "../store";
import { Log } from "./Log";

export const Logs: FC = () => {
    const eventTypes = useLogsStore((state) => state.eventTypes);

    return (
        <Stack spacing={2} alignSelf="stretch">
            <Typography variant="h5" fontWeight={700} align="center">
                Event Logs
            </Typography>
            {eventTypes.map((eventType) => (
                <Log
                    eventType={eventType.eventType}
                    timestamp={eventType.timestamp}
                />
            ))}
        </Stack>
    );
};
