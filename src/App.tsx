import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import "./App.css";
import {
    AdUnit,
    AdUnitMetaData,
    AdUnitSelector,
    Checklist,
    Logs,
} from "./components";
import { availableAdUnits } from "./constants/adUnits";
import { useGameKeyStore, useLogsStore } from "./store";
import { useChecklistStore } from "./store/useChecklistStore";

function App() {
    const gameKey = useGameKeyStore((state) => state.gameKey);
    const [adUnit, setAdUnit] = useState<AdUnitMetaData | undefined>();
    const checklist = useChecklistStore((state) => state.list);
    const triggerEvent = useChecklistStore((state) => state.triggerEvent);
    const resetChecklist = useChecklistStore((state) => state.resetChecklist);
    const addEventType = useLogsStore((state) => state.addEventType);

    useEffect(() => {
        if (gameKey) {
            const adUnit = availableAdUnits.find(
                (availableAdUnit) => availableAdUnit.game_key === gameKey
            );
            setAdUnit(adUnit);
        }
    }, [gameKey]);

    useEffect(() => {
        const handleSendEvent = (event: any) => {
            console.log("Received event data:", event.detail);

            const eventType = event.detail?.event_type;
            const timestamp = event.detail?.browser_ts;

            addEventType({ timestamp, eventType });

            if (eventType in checklist) {
                triggerEvent(eventType);
            }
        };

        window.addEventListener("sendEvent", handleSendEvent);

        return () => window.removeEventListener("sendEvent", handleSendEvent);
    }, []);

    const monitorEvents = () => {
        window.location.reload();
    };

    const resetMonitoringEvents = () => {
        resetChecklist();
        window.location.reload();
    };

    return (
        <Stack
            minHeight="100vh"
            alignItems="center"
            p={4}
            sx={{
                gap: "32px",
            }}
        >
            <AdUnitSelector />
            <Stack
                spacing={8}
                style={{ margin: "auto 0" }}
                direction={{
                    md: "row",
                    xs: "column",
                }}
            >
                {adUnit && (
                    <AdUnit
                        id="gameLoaderScript"
                        src="/dsp_tester.js"
                        data={adUnit}
                    />
                )}
                <Stack alignItems="center">
                    <Checklist />
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={monitorEvents}>
                            Monitor
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={resetMonitoringEvents}
                        >
                            Reset
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
            <Logs />
        </Stack>
    );
}

export default App;
