import React from "react";
import {Editor, Element, Transforms} from "slate";
import {useSlate} from "slate-react";

import Button from "./Button";

import {Align} from "../../../types/CustomTypes";

const AlignButton = ({ icon, align }: Props) => {
	const editor = useSlate();
	
	const onClick = () => {
		toggleAlign(editor, align);
	};
	
	const active = isAlignActive(editor, align);
	
	return (
		<Button icon={icon} active={active} onClick={onClick} />
	);
};

const isAlignActive = (editor: Editor, align: Align) => {
	const { selection } = editor;
	if (!selection) return false;
	
	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: node =>
				!Editor.isEditor(node) &&
				Element.isElement(node) &&
				node.align === align,
		})
	);
	
	return !!match;
};

const toggleAlign = (editor: Editor, align: Align) => {
	if (isAlignActive(editor, align)) {
		Transforms.unsetNodes(editor, "align");
	} else {
		Transforms.setNodes(editor, {
			align: align
		});
	}
};

interface Props {
	icon: React.ReactNode,
	align: Align
}

export default AlignButton;