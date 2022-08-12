import React from "react";
import classNames from "classnames";
import {RenderElementProps} from "slate-react";

import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import List from "../List";
import {ListType} from "../List/List";
import {OuterLink} from "../Link";

const Element = ({ children, element, attributes }: RenderElementProps) => {
	const align = element.align;
	let classes = "";
	
	if (align) {
		classes = classNames(label[align]);
	}
	
	switch (element.type) {
		case "ul-list":
			return (
				<List type={ListType.unordered} {...attributes}>
					{children}
				</List>
			);
		case "ol-list":
			return (
				<List type={ListType.ordered} {...attributes}>
					{children}
				</List>
			);
		case "list-item":
			return (
				<li className={classNames(classes)} {...attributes}>
					{children}
				</li>
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
		case "link":
			return (
				<OuterLink className={classNames(classes, link.underlined)} to={element.url ?? ""} {...attributes}>
					{children}
				</OuterLink>
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