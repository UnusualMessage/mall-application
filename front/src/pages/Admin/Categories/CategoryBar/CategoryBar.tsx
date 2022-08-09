import classNames from "classnames";

import label from "/src/components/Label/label.module.scss";
import css from "../../Items/ItemBar/bar.module.scss";

import Label from "../../../../components/Label";
import {InnerLink} from "../../../../components/Link";

const CategoryBar = ({ title, to }: Props) => {
	return (
		<InnerLink className={classNames(css.wrapper)} to={to}>
			<Label text={title} className={classNames(label.big, label.bold)}/>
		</InnerLink>
	);
};

interface Props {
	title: string,
	to: string
}

export default CategoryBar;