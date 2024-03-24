import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import {
    AdUnit,
    AdUnitMetaData,
    AdUnitSelector,
    Checklist,
} from "./components";
import { availableAdUnits } from "./constants/adUnits";
import { useGameKeyStore } from "./store";
import { useChecklistStore } from "./store/useChecklistStore";

function App() {
    const gameKey = useGameKeyStore((state) => state.gameKey);
    const [adUnit, setAdUnit] = useState<AdUnitMetaData | undefined>();
    const checklist = useChecklistStore((state) => state.list);
    const triggerEvent = useChecklistStore((state) => state.triggerEvent);
    const resetChecklist = useChecklistStore((state) => state.resetChecklist);

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

    return (
        <Container>
            <AdUnitSelector />
            {adUnit && (
                <AdUnit
                    id="gameLoaderScript"
                    src="/dsp_tester.js"
                    data={adUnit}
                />
            )}
            <Checklist />
            <button onClick={monitorEvents}>Monitor</button>
            <button onClick={resetChecklist}>Reset</button>
        </Container>
    );
}

const Container = styled.div``;

export default App;
