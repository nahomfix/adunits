import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FC } from "react";
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
        <FormControl
            sx={{
                alignSelf: "flex-start",
            }}
        >
            <InputLabel id="gamekey-label">Age</InputLabel>
            <Select
                labelId="gamekey-label"
                id="gamekey-select"
                value={gameKey}
                label="Game Key"
                onChange={(e: SelectChangeEvent) =>
                    changeGameKey(e.target.value)
                }
            >
                <MenuItem value="">Please select an ad unit</MenuItem>
                {availableGameKeys.map((availableGameKey) => (
                    <MenuItem key={availableGameKey} value={availableGameKey}>
                        {availableGameKey}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
