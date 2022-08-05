import classNames from "classnames";
import React from "react";
import {RenderLeafProps} from "slate-react";

import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

const Text = ({ children, leaf, attributes }: RenderLeafProps) => {
	const classes = classNames({
		[label.mini]: true,
		[label.bold]: leaf.bold,
		[label.italic]: leaf.italic,
		[link.underlined]: leaf.underlined
	});
	
	return (
		<span className={classes} {...attributes}>
			{children}
		</span>
	);
};

export default Text;