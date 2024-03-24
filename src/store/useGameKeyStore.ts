import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameKeyState {
    gameKey: string;
}

interface GameKeyActions {
    setGameKey: (gameKey: string) => void;
}

export const useGameKeyStore = create<GameKeyState & GameKeyActions>()(
    persist(
        (set) => ({
            gameKey: "",
            setGameKey: (gameKey) =>
                set({
                    gameKey,
                }),
        }),
        {
            name: "gameKey-store",
        }
    )
);
