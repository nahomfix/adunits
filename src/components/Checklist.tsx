import { FC } from "react";
import styled from "styled-components";
import { events } from "../constants/events";
import { ChecklistItem } from "./ChecklistItem";

export const Checklist: FC = () => {
    return (
        <Stack>
            {events.map((event) => (
                <ChecklistItem key={event} name={event} />
            ))}
        </Stack>
    );
};

const Stack = styled.div`
    display: flex;
    flex-direction: column;
`;
