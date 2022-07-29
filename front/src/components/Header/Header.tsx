import { observer } from "mobx-react-lite";

import css from "./header.module.scss";

import Image from "../Image";
import Icon from "../Icon";
import Contacts from "../Contacts";
import Socials from "../Socials";

import icons from "../../data/icons";
import InterfaceStore from "../../stores/InterfaceStore";

const Header = () => {
	const onMenuShow = () => {
		InterfaceStore.switchMenu();
	};
	
	return (
		<header className={`${css.wrapper}`}>
			<div className={`${css.inner}`}>
				<div className={`${css.start}`}>
					<Icon className={`${css.menu}`} viewBox={"0 0 512 512"} icon={icons.menu} onClick={onMenuShow}/>
					<Image classes={css.logo} source={"/Logo.png"} />
				</div>
				
				<Contacts className={css.info}/>
				<Socials/>
			</div>
		</header>
	);
};

export default observer(Header);