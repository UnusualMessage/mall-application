import React, {MouseEventHandler} from "react";
import {useSlate} from "slate-react";
import {Editor} from "slate";

import Button from "./Button";

const TextButton = ({ icon, format }: Props) => {
	const editor = useSlate();
	
	const onClick: MouseEventHandler = (e) => {
		e.preventDefault();
		toggleMark(editor, format);
	};
	
	const active = isMarkActive(editor, format);
	
	return (
		<Button icon={icon} onMouseDown={onClick} active={active}/>
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
	icon: React.ReactNode,
	format: string
}

export default TextButton;