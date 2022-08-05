import React from "react";
import classNames from "classnames";
import {RenderElementProps} from "slate-react";

import label from "/src/components/Label/label.module.scss";

const Element = ({ children, element, attributes }: RenderElementProps) => {
	const align = element.align;
	let classes = "";
	
	if (align) {
		classes = classNames(label[align]);
	}
	
	switch (element.type) {
		case "ul-list":
			return (
				<ul className={classNames(classes)} {...attributes}>
					{children}
				</ul>
			);
		case "ol-list":
			return (
				<ol className={classNames(classes)} {...attributes}>
					{children}
				</ol>
			);
		case "heading-one":
			return (
				<h1 className={classNames(classes)} {...attributes}>
					{children}
				</h1>
			);
		case "heading-two":
			return (
				<h2 className={classNames(classes)} {...attributes}>
					{children}
				</h2>
			);
		default:
			return (
				<p className={classNames(classes)} {...attributes}>
					{children}
				</p>
			);
	}
};

export default Element;