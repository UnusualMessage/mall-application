import {useSlate} from "slate-react";
import React, {useEffect, useState} from "react";
import {Select, Space} from "antd";
import {Editor, Element, Transforms} from "slate";
import {ElementType, Level} from "../../../types/CustomTypes";

const { Option } = Select;

const HeadingSelect = () => {
	const [level, setLevel] = useState<Level | undefined>();
	const [type, setType] = useState<"paragraph" | "heading">("paragraph");
	
	const editor = useSlate();
	const { selection } = editor;
	
	const onLevelChange = (level: Level) => {
		setLevel(level);
		setType("heading");
		toggleType(editor, "heading", level);
	};
	
	const onTypeChange = (type: "paragraph" | "heading") => {
		setType(type);
		
		if (type === "paragraph") {
			setLevel(undefined);
			toggleType(editor, "paragraph", undefined);
		} else {
			setLevel(1);
			toggleType(editor, "heading", 1);
		}
	};
	
	useEffect(() => {
		const isHeading = isActive(editor, "heading");
		
		if (isHeading) {
			setType("heading");
			setLevel(isHeading as Level);
		} else {
			setType("paragraph");
			setLevel(undefined);
		}
	}, [selection]);
	
	return(
		<Space>
			<Select value={type} onChange={onTypeChange} style={{ width: 120 }}>
				<Option value={"paragraph"}>Параграф</Option>
				<Option value={"heading"}>Заголовок</Option>
			</Select>
			
			<Select value={level} onChange={onLevelChange} style={{ width: 50 }}>
				<Option value={1}>1</Option>
				<Option value={2}>2</Option>
				<Option value={3}>3</Option>
				<Option value={4}>4</Option>
				<Option value={5}>5</Option>
			</Select>
		</Space>
		
	);
};

const toggleType = (editor: Editor, type: "paragraph" | "heading", level: Level | undefined) => {
	if (level) {
		const newProperties = {
			type: "heading" as ElementType,
			level: level
		};
		
		Transforms.setNodes<Element>(editor, newProperties);
	} else {
		const newProperties = {
			type: "paragraph" as ElementType,
			level: undefined
		};
		
		Transforms.setNodes<Element>(editor, newProperties);
	}
};

const isHeadingActive = (editor: Editor): Level | false => {
	const { selection } = editor;
	
	if (!selection) {
		return false;
	}
	
	const matches = Editor.nodes(editor, {
		at: Editor.unhangRange(editor, selection),
		match: node =>
			!Editor.isEditor(node) &&
			Element.isElement(node) &&
			node.type === "heading"
	});
	
	const value = matches.next().value;
	
	if (!!value) {
		const node = value[0] as Element;
		
		if (node.level) {
			return node.level;
		}
	}
	
	return false;
};

const isParagraphActive = (editor: Editor): boolean => {
	const { selection } = editor;
	
	if (!selection) {
		return true;
	}
	
	const matches = Editor.nodes(editor, {
		at: Editor.unhangRange(editor, selection),
		match: node =>
			!Editor.isEditor(node) &&
			Element.isElement(node) &&
			node.type === "paragraph",
	});
	
	return !!matches.next().value;
};

const isActive = (editor: Editor, type: "paragraph" | "heading") => {
	switch (type) {
		case "paragraph":
			return isParagraphActive(editor);
		case "heading":
			return isHeadingActive(editor);
	}
	
	return true;
};

export default HeadingSelect;