import React from "react";

import css from "./main.module.scss";
import text from "../common/Label/label.module.scss";

import Title from "../common/Title";
import Breadcrumbs from "../Breadcrumbs";

import Breadcrumb from "../../types/Breadcrumb";

const Main = ({ breadcrumbs, children }: Props) => {
	return(
		<main className={`${css.wrapper}`}>
			<div className={`${css.inner}`}>
				<Title classes={`${css.title} ${text.title}`} text={breadcrumbs[breadcrumbs.length - 1].name}/>
				<Breadcrumbs breadcrumbs={breadcrumbs}/>
				{children}
			</div>
		</main>
	);
};

interface Props {
	breadcrumbs: Breadcrumb[],
	children: React.ReactNode
}

export default Main;