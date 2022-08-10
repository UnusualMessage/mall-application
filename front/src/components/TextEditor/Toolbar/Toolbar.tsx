import classNames from "classnames";

import css from "./toolbar.module.scss";

import TextButton from "./TextButton";
import ElementButton from "./ElementButton";

import icons from "../../../data/icons";

const Toolbar = () => {
	return (
		<div className={classNames(css.wrapper)}>
			<TextButton icon={icons.bold} format={"bold"}/>
			<TextButton icon={icons.italic} format={"italic"}/>
			<TextButton icon={icons.underlined} format={"underlined"}/>
			
			<ElementButton icon={icons.left} format={"left"}/>
			<ElementButton icon={icons.center} format={"center"}/>
			<ElementButton icon={icons.right} format={"right"}/>
		</div>
	);
};

export default Toolbar;