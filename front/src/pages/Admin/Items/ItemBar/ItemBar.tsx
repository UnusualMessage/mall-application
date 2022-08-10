import classNames from "classnames";

import css from "./bar.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../../../components/Label";
import Image from "../../../../components/Image";
import {InnerLink} from "../../../../components/Link";

const ItemBar = ({ title, image, to }: Props) => {
	return (
		<InnerLink className={classNames(css.wrapper)} to={to}>
			<Image classes={classNames(css.logo)} source={image}/>
			<Label text={title} className={classNames(label.big, label.bold)}/>
		</InnerLink>
	);
};

interface Props {
	title: string,
	image: string,
	to: string
}

export default ItemBar;