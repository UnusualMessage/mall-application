import React from "react";

import label from "../Label/label.module.scss";
import link from "../Link/link.module.scss";
import css from "./breadcrumbs.module.scss";

import Breadcrumb from "../../types/Breadcrumb";
import Label from "../Label";
import {InnerLink} from "../Link";

const Breadcrumbs = ({ breadcrumbs }: Props) => {
	if (breadcrumbs.length <= 1) {
		return null;
	}
	
	return(
		<div className={`${css.wrapper}`}>
			{breadcrumbs.map(({ name, route }, key) => {
					return(
						key + 1 === breadcrumbs.length ? (
							<Label key={key} text={name} className={`${label.mini} ${label.bold}`} />
						) : (
							<React.Fragment key={key}>
								<InnerLink className={`${label.mini} ${link.underlined}`} to={route}>
									{name}
								</InnerLink>
								
								<Label text={"→"} className={`${label.mini}`} />
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