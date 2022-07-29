import {observer} from "mobx-react-lite";

import css from "./footer.module.scss";
import label from "../Label/label.module.scss";
import link from "../Link/link.module.scss";

import Image from "../Image";
import {InnerLink, OuterLink} from "../Link";
import Label from "../Label";
import Icon from "../Icon";

import contacts from "../../data/contacts";
import icons from "../../data/icons";
import navs from "../../data/navs";
import Contacts from "../Contacts";
import Socials from "../Socials";

const Footer = () => {
    return(
        <footer className={`${css.wrapper}`}>
            <div className={`${css.inner}`}>
                <div className={`${css.start}`}>
                    <Image classes={`${css.logo}`} source={"/Logo.png"}/>
                    <Socials/>
                    <Label text={"© 2022  ТЦ Веневский"} className={`${label.mini}`}/>
                </div>
                
                <div className={css.contacts}>
                    <Contacts/>
                </div>
                
                <div className={`${css.navs}`}>
                    {navs.map(nav => {
                        return(
                            <InnerLink className={`${link.underlined}`} key={nav.title} to={nav.to}>
                                <Label className={`${label.mini}`} text={nav.title}/>
                            </InnerLink>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
};

export default observer(Footer);