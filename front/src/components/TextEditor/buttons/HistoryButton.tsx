import React, {MouseEventHandler} from "react";
import { useSlate } from "slate-react";
import Button from "./Button";
import {HistoryEditor} from "slate-history";
import {message} from "antd";

const HistoryButton = ({ icon, action }: Props) => {
	const editor = useSlate();
	
	const onClick: MouseEventHandler = () => {
		if (action === Action.redo) {
			message.destroy();
			HistoryEditor.redo(editor);
			void message.info("Возврат действия!", 1);
		}
		
		if (action === Action.undo) {
			message.destroy();
			HistoryEditor.undo(editor);
			void message.info("Действие отменено!", 1);
		}
	};
	
	let label;
	
	switch (action) {
		case Action.undo:
			label = "Отмена действия";
			break;
			
		case Action.redo:
			label = "Возврат действия";
			break;
	}
	
	return (
		<Button icon={icon} onClick={onClick} active={false} label={label}/>
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