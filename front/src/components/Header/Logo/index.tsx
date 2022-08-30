import classNames from "classnames";
import {memo} from "react";

import css from "./index.module.scss";

import Burger from "../Burger";
import Image from "../../Image";

const Logo = () => {
	return (
		<div className={classNames(css.wrapper)}>
			<Burger/>
			<Image classes={classNames(css.logo)} source={"/Logo.png"} />
		</div>
	);
};

export default memo(Logo);