import React from "react";
import classNames from "classnames";

import label from "../Label/label.module.scss";
import link from "../Link/link.module.scss";
import css from "./breadcrumbs.module.scss";

import Label from "../Label";
import {InnerLink} from "../Link";

import Breadcrumb from "../../types/Breadcrumb";

const Breadcrumbs = ({ breadcrumbs }: Props) => {
	if (breadcrumbs.length <= 1) {
		return null;
	}
	
	return(
		<div className={classNames(css.wrapper)}>
			{breadcrumbs.map(({ name, route }, key) => {
					return(
						key + 1 === breadcrumbs.length ? (
							<Label key={key} text={name} className={classNames(label.mini, label.bold)} />
						) : (
							<React.Fragment key={key}>
								<InnerLink className={classNames(label.mini, link.underlined)} to={route}>
									{name}
								</InnerLink>
								
								<Label text={"→"} className={classNames(label.mini)} />
							</React.Fragment>
						)
					);
				}
			)}
		</div>
	);
};

interface Props {
	breadcrumbs: Breadcrumb[]
}

export default Breadcrumbs;