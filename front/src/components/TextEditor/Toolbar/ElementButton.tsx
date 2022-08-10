import React from "react";
import {Editor, Element, Transforms} from "slate";
import {useSlate} from "slate-react";

import Button from "./Button";

const ElementButton = ({ icon, format }: Props) => {
	const editor = useSlate();
	
	const onClick = () => {
		toggleAlign(editor, format);
	};
	
	const active = isAlignActive(editor, format);
	
	return(
		<Button icon={icon} onClick={onClick} active={active}/>
	);
};

const isAlignActive = (editor: Editor, align: string) => {
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

const toggleAlign = (editor: Editor, align: string) => {
	if (isAlignActive(editor, align)) {
		Transforms.unsetNodes(editor, "align");
	} else {
		Transforms.setNodes(editor, {
			align: align
		});
	}
};

interface Props {
	icon: React.ReactNode
	format: string
}

export default ElementButton;