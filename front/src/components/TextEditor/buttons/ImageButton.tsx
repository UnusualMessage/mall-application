import React, {MouseEventHandler, useEffect, useState} from "react";
import {useSlate} from "slate-react";
import {Editor, Transforms, Element} from "slate";

import Button from "./Button";
import {ImageDrawer} from "../../Form/inputs/ImagePicker";
import {Image} from "../../../api/interfaces/image";

const ImageButton = ({ icon }: Props) => {
	const editor = useSlate();
	const [image, setImage] = useState<Image>();
	const [visible, setVisible] = useState(false);
	
	const pick = (image: Image) => {
		setImage(image);
		setVisible(false);
	};
	
	useEffect(() => {
		if (image) {
			insertImage(editor, image.path);
		}
	}, [image]);
	
	const onMouseDown: MouseEventHandler = (e) => {
		e.preventDefault();
		setVisible(true);
	};
	
	return (
		<>
			<Button icon={icon} onMouseDown={onMouseDown} active={false} label={"Добавить изображения"}/>
			<ImageDrawer visible={visible} setVisible={setVisible} pick={pick}/>
		</>
	);
};

export const withImages = (editor: Editor) => {
	const { isVoid } = editor;
	
	editor.isVoid = (element) => {
		return element.type === "image" ? true : isVoid(element);
	};
	
	return editor;
};

const insertImage = (editor: Editor, src: string) => {
	const text = { text: "" };
	const image: Element = {
		type: "image",
		src,
		children: [text]
	};
	
	Transforms.insertNodes(editor, image);
};

interface Props {
	icon: React.ReactNode,
	format: string
}

export default ImageButton;