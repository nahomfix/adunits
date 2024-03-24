import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { AdUnit, AdUnitMetaData, AdUnitSelector } from "./components";
import { availableAdUnits } from "./constants/adUnits";
import { useGameKeyStore } from "./store";

function App() {
    const gameKey = useGameKeyStore((state) => state.gameKey);
    const [adUnit, setAdUnit] = useState<AdUnitMetaData | undefined>();

    useEffect(() => {
        if (gameKey) {
            const adUnit = availableAdUnits.find(
                (availableAdUnit) => availableAdUnit.game_key === gameKey
            );
            setAdUnit(adUnit);
        }
    }, [gameKey]);

    return (
        <Container>
            <AdUnitSelector />
            {adUnit && (
                <AdUnit
                    id="gameLoaderScript"
                    src="https://wat.adludio.com/loaders/cda/dsp_tester.js"
                    data={adUnit}
                />
            )}
        </Container>
    );
}

const Container = styled.div``;

export default App;
