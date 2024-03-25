import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { useChecklistStore } from "../store/useChecklistStore";

interface ChecklistItemProps {
    name: string;
}

export const ChecklistItem: FC<ChecklistItemProps> = ({ name }) => {
    const enableEvent = useChecklistStore((state) => state.enableEvent);
    const disableEvent = useChecklistStore((state) => state.disableEvent);
    const checklist = useChecklistStore((state) => state.list);

    const getStatus = (eventType: string) => {
        if (!checklist[eventType]["touched"]) return null;

        if (
            checklist[eventType]["enabled"] &&
            checklist[eventType]["triggered"]
        ) {
            return <CheckCircleIcon fontSize="small" color="success" />;
        }

        if (
            checklist[eventType]["enabled"] &&
            !checklist[eventType]["triggered"]
        ) {
            return <CancelIcon fontSize="small" color="error" />;
        }
    };

    return (
        <Stack direction="row" alignItems="center" mr={4}>
            <FormControlLabel
                control={
                    <Checkbox
                        id={name}
                        checked={checklist[name]["enabled"]}
                        onChange={(e) => {
                            if (e.target.checked) {
                                enableEvent(name);
                            } else {
                                disableEvent(name);
                            }
                        }}
                    />
                }
                label={name}
            />
            {getStatus(name)}
        </Stack>
    );
};
