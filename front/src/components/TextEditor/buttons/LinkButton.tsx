import { useSlate } from "slate-react";
import { Editor, Transforms, Element, Range } from "slate";
import React, {MouseEventHandler} from "react";
import isUrl from "is-url";

import Button from "./Button";

export enum LinkButtonType {
	add,
	remove
}

interface Props {
	icon: React.ReactNode
	action: LinkButtonType
}

const LinkButton = ({ icon, action }: Props) => {
	const editor = useSlate();
	
	const onClick: MouseEventHandler = () => {
		if (action === LinkButtonType.add) {
			const url = window.prompt("Введите ссылку.");
			
			if (url) {
				insertLink(editor, url);
			}
		}
		
		if (action === LinkButtonType.remove) {
			if (isLinkActive(editor)) {
				unwrapLink(editor);
			}
		}
	};
	
	const active = isLinkActive(editor);
	
	let label;
	
	switch (action) {
		case LinkButtonType.add:
			label = "Добавить ссылку";
			break;
		case LinkButtonType.remove:
			label = "Удалить ссылку";
			break;
	}
	
	return (
		<Button active={active} onMouseDown={onClick} icon={icon} label={label}/>
	);
};

const isLinkActive = (editor: Editor) => {
	const [match] = Editor.nodes(editor, {
		match: node =>
			!Editor.isEditor(node) &&
			Element.isElement(node) &&
			node.type === "link",
	});
	return !!match;
};

const unwrapLink = (editor: Editor) => {
	Transforms.unwrapNodes(editor, {
		match: node =>
			!Editor.isEditor(node) &&
			Element.isElement(node) &&
			node.type === "link",
	});
};

const wrapLink = (editor: Editor, url: string) => {
	if (isLinkActive(editor)) {
		unwrapLink(editor);
	}
	
	const { selection } = editor;
	const isCollapsed = selection && Range.isCollapsed(selection);
	
	const link: Element = {
		type: "link",
		url: url,
		children: isCollapsed ? [{ text: url }] : [],
	};
	
	if (isCollapsed) {
		Transforms.insertNodes(editor, link);
	} else {
		Transforms.wrapNodes(editor, link, { split: true });
		Transforms.collapse(editor, { edge: "end" });
	}
};

const insertLink = (editor: Editor, url: string) => {
	if (editor.selection) {
		wrapLink(editor, url);
	}
};

export const withInlines = (editor: Editor) => {
	const { insertData, insertText, isInline } = editor;
	
	editor.isInline = (element) =>
		["link"].includes(element.type) || isInline(element);
	
	editor.insertText = (text) => {
		if (text && isUrl(text)) {
			wrapLink(editor, text);
		} else {
			insertText(text);
		}
	};
	
	editor.insertData = (data) => {
		const text = data.getData("text/plain");
		
		if (text && isUrl(text)) {
			wrapLink(editor, text);
		} else {
			insertData(data);
		}
	};
	
	return editor;
};

export default LinkButton;