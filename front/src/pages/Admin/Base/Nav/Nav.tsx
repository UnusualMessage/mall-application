import classNames from "classnames";
import React from "react";

import css from "./nav.module.scss";
import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Image from "../../../../components/Image";
import {InnerLink} from "../../../../components/Link";
import Label from "../../../../components/Label";
import Icon from "../../../../components/Icon";

import icons from "../../../../data/icons";

const Nav = () => {
	return (
		<nav className={classNames(css.wrapper)}>
			<div className={classNames(css.inner)}>
				<InnerLink className={classNames()} to={"/"}>
					<Image classes={classNames(css.logo)} source={"/Logo.png"} />
				</InnerLink>
				
				<InnerLink className={classNames(css.link, link.hovered)} to={"shops"}>
					<Icon className={classNames()} viewBox={"0 0 24 24"} icon={icons.shops}/>
					<Label text={"магазины"} className={classNames(css.title, label.mini, label.upper, label.bold)}/>
				</InnerLink>
				
				<InnerLink className={classNames(css.link, link.hovered)} to={"discounts"}>
					<Icon className={classNames()} viewBox={"0 0 24 24"} icon={icons.discounts}/>
					<Label text={"Акции и скидки"} className={classNames(css.title, label.mini, label.upper, label.bold)}/>
				</InnerLink>
				
				<InnerLink className={classNames(css.link, link.hovered)} to={"events"}>
					<Icon className={classNames()} viewBox={"0 0 24 24"} icon={icons.events}/>
					<Label text={"События и новости"} className={classNames(css.title, label.mini, label.upper, label.bold)}/>
				</InnerLink>
				
				<InnerLink className={classNames(css.link, link.hovered)} to={"categories"}>
					<Icon className={classNames()} viewBox={"0 0 24 24"} icon={icons.contacts}/>
					<Label text={"Категории"} className={classNames(css.title, label.mini, label.upper, label.bold)}/>
				</InnerLink>
				
				<InnerLink className={classNames(css.link, link.hovered)} to={"info"}>
					<Icon className={classNames()} viewBox={"0 0 24 24"} icon={icons.contacts}/>
					<Label text={"Контакты"} className={classNames(css.title, label.mini, label.upper, label.bold)}/>
				</InnerLink>
			</div>
		</nav>
	);
};

export default Nav;