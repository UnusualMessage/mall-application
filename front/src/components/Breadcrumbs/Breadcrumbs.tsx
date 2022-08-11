import React from "react";
import classNames from "classnames";

import label from "../Label/label.module.scss";
import linkStyles from "../Link/link.module.scss";
import css from "./breadcrumbs.module.scss";

import Label from "../Label";
import {InnerLink} from "../Link";
import Breadcrumb from "../../api/interfaces/breadcrumb/Breadcrumb";

const Breadcrumbs = ({ breadcrumbs }: Props) => {
	if (breadcrumbs.length <= 1) {
		return null;
	}
	
	return(
		<div className={classNames(css.wrapper)}>
			{breadcrumbs.map(({ name, link }, key) => {
					return(
						key + 1 === breadcrumbs.length ? (
							<Label key={key} text={name} className={classNames(label.mini, label.bold)} />
						) : (
							<React.Fragment key={key}>
								<InnerLink className={classNames(label.mini, linkStyles.underlined)} to={link}>
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