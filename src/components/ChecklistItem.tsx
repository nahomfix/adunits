import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import styled from "styled-components";
import { useChecklistStore } from "../store/useChecklistStore";

interface ChecklistItemProps {
    name: string;
}

export const ChecklistItem: FC<ChecklistItemProps> = ({ name }) => {
    const enableEvent = useChecklistStore((state) => state.enableEvent);
    const disableEvent = useChecklistStore((state) => state.disableEvent);
    const checklist = useChecklistStore((state) => state.list);

    const getStatus = (eventType) => {
        if (!checklist[eventType]["touched"]) return null;

        if (
            checklist[eventType]["enabled"] &&
            checklist[eventType]["triggered"]
        ) {
            return <CheckIcon />;
        }

        if (
            checklist[eventType]["enabled"] &&
            !checklist[eventType]["triggered"]
        ) {
            return <XIcon />;
        }
    };

    return (
        <Container>
            <Checkbox
                id={name}
                type="checkbox"
                checked={checklist[name]["enabled"]}
                onChange={(e) => {
                    if (e.target.checked) {
                        enableEvent(name);
                    } else {
                        disableEvent(name);
                    }
                }}
            />
            <Label htmlFor={name}>{name}</Label>
            {getStatus(name)}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Checkbox = styled.input`
    cursor: pointer;
`;

const Label = styled.label`
    cursor: pointer;
`;

const CheckIcon = styled(CheckCircleIcon)`
    color: green;
    height: 20px;
    width: 20px;
`;

const XIcon = styled(XCircleIcon)`
    color: red;
    height: 20px;
    width: 20px;
`;
