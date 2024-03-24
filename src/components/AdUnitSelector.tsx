import { FC } from "react";
import styled from "styled-components";
import { availableAdUnits } from "../constants/adUnits";
import { useGameKeyStore } from "../store";

const availableGameKeys = availableAdUnits.map(
    (availableAdUnit) => availableAdUnit.game_key
);

export const AdUnitSelector: FC = () => {
    const gameKey = useGameKeyStore((state) => state.gameKey);
    const setGameKey = useGameKeyStore((state) => state.setGameKey);

    const changeGameKey = (gameKey: string) => {
        setGameKey(gameKey);
        window.location.reload();
    };

    return (
        <Container>
            <label htmlFor="gameKey">Game Key</label>
            <select
                id="gameKey"
                value={gameKey}
                onChange={(e) => changeGameKey(e.target.value)}
            >
                <option value="">Please select an ad unit</option>
                {availableGameKeys.map((availableGameKey) => (
                    <option key={availableGameKey} value={availableGameKey}>
                        {availableGameKey}
                    </option>
                ))}
            </select>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
