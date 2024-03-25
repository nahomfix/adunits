import FormGroup from "@mui/material/FormGroup";
import { FC } from "react";
import { events } from "../constants/events";
import { ChecklistItem } from "./ChecklistItem";

export const Checklist: FC = () => {
    return (
        <FormGroup
            sx={{
                height: {
                    md: "500px",
                    xs: "700px",
                },
            }}
        >
            {events.map((event) => (
                <ChecklistItem key={event} name={event} />
            ))}
        </FormGroup>
    );
};
