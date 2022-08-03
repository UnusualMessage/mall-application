import React from "react";
import classNames from "classnames";

import label from "/src/components/Label/label.module.scss";

const Element = ({ children, type, align }: ElementProps) => {
	let classes = "";
	if (align) {
		classes = classNames(label[align]);
	}
	
	switch (type) {
		case "p":
			return (
				<p className={classNames(classes)}>
					{children}
				</p>
			);
		default:
			return (
				<DefaultElement>
					{children}
				</DefaultElement>
			);
	}
};

const DefaultElement = ({ children }: DefaultElementProps) => {
	return (
		<p>
			{children}
		</p>
	);
};

interface DefaultElementProps {
	children: React.ReactNode
}

interface ElementProps {
	children: React.ReactNode,
	type: string,
	align?: Align
}

type Align = "center" | "left" | "right" | "justify";


export default Element;