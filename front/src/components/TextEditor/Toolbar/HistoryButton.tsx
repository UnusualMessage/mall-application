import React, {MouseEventHandler} from "react";
import { useSlate } from "slate-react";
import Button from "./Button";
import {HistoryEditor} from "slate-history";

const HistoryButton = ({ icon, action }: Props) => {
	const editor = useSlate();
	
	const onClick: MouseEventHandler = () => {
		if (action === Action.redo) {
			HistoryEditor.redo(editor);
		}
		
		if (action === Action.undo) {
			HistoryEditor.undo(editor);
		}
	};

	return (
		<Button icon={icon} onClick={onClick} active={false} />
	);
};

export enum Action {
	redo,
	undo
}

interface Props {
	icon: React.ReactNode
	action: Action
}

export default HistoryButton;