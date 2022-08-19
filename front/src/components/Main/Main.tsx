import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import classNames from "classnames";
import {useLocation} from "react-router-dom";

import css from "./main.module.scss";
import label from "../Label/label.module.scss";

import Breadcrumbs from "../Breadcrumbs";
import Label from "../Label";

import NavigationStore from "../../stores/NavigationStore";

const Main = ({ children }: Props) => {
	const location = useLocation();
	
	const breadcrumbs = NavigationStore.get();
	
	useEffect(() => {
		const setupRoutes = async () => {
			await NavigationStore.getAsync("");
			NavigationStore.toNext(location.pathname);
		};
		
		void setupRoutes();
	}, [location]);
	
	return(
		<main className={classNames(css.wrapper)}>
			<div className={classNames(css.inner)}>
				<h1>
					<Label text={breadcrumbs[breadcrumbs.length - 1].name}
					       className={classNames(css.title, label.title)}/>
				</h1>
				
				<Breadcrumbs breadcrumbs={breadcrumbs}/>
				
				{children}
			</div>
		</main>
	);
};

interface Props {
	children: React.ReactNode
}

export default observer(Main);