import classNames from "classnames";
import React from "react";

import {Typography} from "antd";

const { Title } = Typography;

const TitleElement = React.forwardRef<HTMLHeadingElement, Props>((props, ref) => {
	return (
		<Title className={classNames(props.classes)} level={props.level} ref={ref}>
			{props.children}
		</Title>
	);
});

interface Props {
	children: React.ReactNode,
	classes: string,
	level: 1 | 2 | 3 | 4 | 5
}

TitleElement.displayName = "TitleElement";

export default TitleElement;