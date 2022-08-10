import {memo} from "react";
import classNames from "classnames";

import css from "./header.module.scss";

import Image from "../Image";
import Contacts from "../Contacts";
import Socials from "../Socials";
import Burger from "../Burger/Burger";

const Header = () => {
	return (
		<header className={classNames(css.wrapper)}>
			<div className={classNames(css.inner)}>
				<div className={classNames(css.start)}>
					<Burger/>
					<Image classes={classNames(css.logo)} source={"/Logo.png"} />
				</div>
				
				<Contacts className={classNames(css.info)}/>
				<Socials/>
			</div>
		</header>
	);
};

export default memo(Header);