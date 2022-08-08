import {createEditor, Descendant} from "slate";
import {Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, withReact} from "slate-react";
import {withHistory} from "slate-history";
import {memo, useCallback, useState} from "react";
import classNames from "classnames";

import css from "./editor.module.scss";

import Text from "./Text";
import Element from "./Element";
import Toolbar from "./Toolbar/Toolbar";

const serialize = (value: Descendant[]) => {
	return JSON.stringify(value);
	
};

const deserialize = (value: string) => {
	return JSON.parse(value);
};

const TextEditor = ({ className, readonly, defaultValue }: Props) => {
	const [editor] = useState(() => withReact(withHistory(createEditor() as ReactEditor)));
	
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
	
	const initialValue: Descendant[] = deserialize(defaultValue);
	
	return (
		<div className={classNames(css.wrapper, className)}>
			<Slate editor={editor} value={initialValue}>
				{ readonly ? <></> : <Toolbar/> }
				
				<Editable placeholder={"Введите текст"}
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
	className: string,
	readonly?: boolean,
	defaultValue: string,
}

export default memo(TextEditor);