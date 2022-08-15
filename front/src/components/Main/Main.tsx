import React from "react";
import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "./main.module.scss";
import label from "../Label/label.module.scss";

import Breadcrumbs from "../Breadcrumbs";
import Label from "../Label";

import Breadcrumb from "../../api/interfaces/breadcrumb/Breadcrumb";
import {Skeleton} from "antd";

const Main = ({ breadcrumbs, children }: Props) => {
	return(
		<main className={classNames(css.wrapper)}>
			<div className={classNames(css.inner)}>
				{
					breadcrumbs
						?
						<>
							<h1>
								<Label text={breadcrumbs[breadcrumbs.length - 1].name}
								       className={classNames(css.title, label.title)}/>
							</h1>
							
							<Breadcrumbs breadcrumbs={breadcrumbs}/>
						</>
						:
						<>
							<Skeleton.Input active/>
							<Skeleton.Input active block size={"small"}/>
						</>
				}
				
				{children}
			</div>
		</main>
	);
};

interface Props {
	breadcrumbs?: Breadcrumb[],
	children: React.ReactNode
}

export default observer(Main);