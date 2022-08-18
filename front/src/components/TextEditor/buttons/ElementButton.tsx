import React from "react";
import {useSlate} from "slate-react";
import {Editor, Element, Transforms} from "slate";

import Button from "./Button";
import {ElementType} from "../../../types/CustomTypes";

const ElementButton = ({ icon, type }: Props) => {
	const editor = useSlate();
	
	const onClick = () => {
		toggleType(editor, type);
	};
	
	const active = isBlockActive(editor, type);
	
	return(
		<Button icon={icon} active={active} onClick={onClick}/>
	);
};

const toggleType = (editor: Editor, type: ElementType) => {
	const LIST_TYPES = ["ol-list", "ul-list"];
	
	const isActive = isBlockActive(
		editor,
		type,
	);
	
	const isList = LIST_TYPES.includes(type);
	
	Transforms.unwrapNodes(editor, {
		match: node =>
			!Editor.isEditor(node) &&
			Element.isElement(node) &&
			LIST_TYPES.includes(node.type),
		split: true,
	});
	
	const newProperties = {
		type: isActive ? "paragraph" : isList ? "list-item" : type,
	};
	
	Transforms.setNodes<Element>(editor, newProperties);
	
	if (!isActive && isList) {
		const block = { type: type, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

const isBlockActive = (editor: Editor, type: ElementType) => {
	const { selection } = editor;
	if (!selection) return false;
	
	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: node =>
				!Editor.isEditor(node) &&
				Element.isElement(node) &&
				node.type === type,
		})
	);
	
	return !!match;
};

interface Props {
	icon: React.ReactNode
	type: ElementType
}

export default ElementButton;