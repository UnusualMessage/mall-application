import React, { MouseEventHandler } from "react";
import { useSlate } from "slate-react";
import { Editor } from "slate";

import Button from "./Button";
import { TextFormat } from "../../../types/CustomTypes";

const TextButton = ({ icon, format }: Props) => {
    const editor = useSlate();

    const onClick: MouseEventHandler = (e) => {
        e.preventDefault();
        toggleMark(editor, format);
    };

    const active = isMarkActive(editor, format);

    let label;

    switch (format) {
        case "bold":
            label = "Полужирный";
            break;

        case "italic":
            label = "Курсив";
            break;

        case "underlined":
            label = "Подчеркнутый";
            break;
    }

    return (
        <Button
            icon={icon}
            onMouseDown={onClick}
            active={active}
            label={label}
        />
    );
};

const toggleMark = (editor: Editor, format: string) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor) as Record<string, boolean> | null;

    if (marks) {
        return marks[format];
    }

    return false;
};

interface Props {
    icon: React.ReactNode;
    format: TextFormat;
}

export default TextButton;
