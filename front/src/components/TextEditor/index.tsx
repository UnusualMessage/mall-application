import {createEditor, Descendant} from "slate";
import {Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, withReact} from "slate-react";
import {withHistory} from "slate-history";
import {memo, useCallback, useState} from "react";
import classNames from "classnames";

import css from "./index.module.scss";

import Text from "./base/Leaf";
import Element from "./base/Element";
import Toolbar from "./Toolbar";
import {withInlines} from "./buttons/LinkButton";
import {withImages} from "./buttons/ImageButton";

const TextEditor = ({ readonly, onChange, placeholder, text }: Props) => {
	const [editor] = useState(() => withImages(withInlines(withReact(withHistory(createEditor() as ReactEditor)))));

	const renderText = useCallback((props: RenderLeafProps) => {
		return (
			<Text {...props}>
				{props.children}
			</Text>
		);
	}, []);
	
	const renderElement = useCallback((props: RenderElementProps) => {
		return (
			<Element {...props}>
				{props.children}
			</Element>
		);
	}, []);
	
	if (!text) {
		return null;
	}
	
	const classes = classNames({
		[css.wrapper]: !readonly,
		[css.readonly]: readonly
	});
	
	return (
		<div className={classes}>
			<Slate editor={editor} value={JSON.parse(text)} onChange={onChange}>
				{ readonly ? <></> : <Toolbar/> }
				
				<Editable placeholder={placeholder}
				          renderLeaf={renderText}
				          renderElement={renderElement}
				          className={classNames(css.content)}
				          readOnly={readonly}
				/>
			</Slate>
		</div>
		
	);
};

interface Props {
	readonly?: boolean,
	onChange?: (value: Descendant[]) => void,
	placeholder?: string,
	text?: string
}

export default memo(TextEditor);