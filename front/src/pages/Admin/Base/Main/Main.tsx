import classNames from "classnames";
import React from "react";

import css from "./main.module.scss";

const Main = ({ children }: Props) => {
	return (
		<main className={classNames(css.wrapper)}>
			<div className={classNames(css.inner)}>
				{children}
			</div>
		</main>
	);
};

interface Props {
	children: React.ReactNode
}

export default Main;