import React from "react";
import {RenderLeafProps} from "slate-react";
import { Typography } from "antd";

const Text = Typography.Text;

const Leaf = ({ children, leaf, attributes }: RenderLeafProps) => {
	return (
		<Text {...attributes} strong={leaf.bold} italic={leaf.italic} underline={leaf.underlined}>
			{children}
		</Text>
	);
};

export default Leaf;