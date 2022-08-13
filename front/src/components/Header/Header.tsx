import {memo} from "react";
import classNames from "classnames";

import css from "./header.module.scss";

import Contacts from "../Contacts";
import Socials from "../Socials";
import Logo from "./Logo";

const Header = () => {
	return (
		<header className={classNames(css.wrapper)}>
			<div className={classNames(css.inner)}>
				<Logo/>
				<Contacts className={classNames(css.info)}/>
				<Socials/>
			</div>
		</header>
	);
};

export default memo(Header);