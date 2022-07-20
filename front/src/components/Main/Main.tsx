import React from "react";

import css from "./main.module.scss";
import label from "../Label/label.module.scss";

import Breadcrumbs from "../Breadcrumbs";
import Label from "../Label";

import Breadcrumb from "../../types/Breadcrumb";

const Main = ({ breadcrumbs, children }: Props) => {
	return(
		<main className={`${css.wrapper}`}>
			<div className={`${css.inner}`}>
				<h1>
					<Label text={breadcrumbs[breadcrumbs.length - 1].name} className={`${css.title} ${label.title}`}/>
				</h1>
				
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