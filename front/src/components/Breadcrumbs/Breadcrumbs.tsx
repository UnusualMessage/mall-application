import React from "react";

import text from "../common/Label/label.module.scss";
import inner from "../common/Inner/inner.module.scss";
import css from "./breadcrumbs.module.scss";

import Label from "../common/Label";
import Inner from "../common/Inner";
import Breadcrumb from "../../api/interfaces/Breadcrumb";

const Breadcrumbs = ({ breadcrumbs }: Props) => {
	if (breadcrumbs.length <= 1) {
		return null;
	}
	
	return(
		<div className={`${css.wrapper}`}>
			{breadcrumbs.map(({ name, route }, key) => {
					return(
						key + 1 === breadcrumbs.length ? (
							<Label key={key} text={name} classes={`${text.mini} ${text.bold}`}/>
						) : (
							<React.Fragment key={key}>
								<Inner key={key} classes={`${text.mini} ${inner.underlined}`} to={route}>
									{name}
								</Inner>
								<Label text={"→"} classes={`${text.mini}`}/>
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