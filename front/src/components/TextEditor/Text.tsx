import classNames from "classnames";
import React from "react";
import {Text as TextInterface} from "slate";

import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

const Text = ({ children, leaf }: Props) => {
	const classes = classNames({
		[label.mini]: true,
		[label.bold]: leaf.bold,
		[label.italic]: leaf.italic,
		[link.underlined]: leaf.underlined
	});
	
	return (
		<span className={classes}>
			{children}
		</span>
	);
};

interface Props {
	children: React.ReactNode
	leaf: TextInterface
}

export default Text;