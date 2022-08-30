import React, { MouseEventHandler } from "react";
import { useSlate } from "slate-react";
import { Transforms, Editor } from "slate";
import Button from "./Button";

const ClearButton = ({ icon }: Props) => {
    const editor = useSlate();

    const onClick: MouseEventHandler = (e) => {
        e.preventDefault();

        Transforms.delete(editor, {
            at: {
                anchor: Editor.start(editor, []),
                focus: Editor.end(editor, []),
            },
        });
    };

    return (
        <Button
            icon={icon}
            onClick={onClick}
            active={false}
            label={"Очистить"}
        />
    );
};

interface Props {
    icon: React.ReactNode;
}

export default ClearButton;
