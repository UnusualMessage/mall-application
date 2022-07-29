import { observer } from "mobx-react-lite";

import css from "./header.module.scss";

import Image from "../Image";
import Contacts from "../Contacts";
import Socials from "../Socials";

import Burger from "../Burger/Burger";

const Header = () => {
	return (
		<header className={`${css.wrapper}`}>
			<div className={`${css.inner}`}>
				<div className={`${css.start}`}>
					<Burger/>
					<Image classes={css.logo} source={"/Logo.png"} />
				</div>
				
				<Contacts className={css.info}/>
				<Socials/>
			</div>
		</header>
	);
};

export default observer(Header);