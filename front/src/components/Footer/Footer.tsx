import { memo } from "react";
import classNames from "classnames";

import css from "./footer.module.scss";
import label from "../Label/label.module.scss";
import link from "../Link/link.module.scss";

import Image from "../Image";
import {InnerLink} from "../Link";
import Label from "../Label";
import Contacts from "../Contacts";
import Socials from "../Socials";

import navs from "../../data/navs";

const Footer = () => {
    return(
        <footer className={classNames(css.wrapper)}>
            <div className={classNames(css.inner)}>
                <div className={classNames(css.start)}>
                    <Image classes={classNames(css.logo)} source={"/Logo.png"}/>
                    <Socials/>
                    <Label className={classNames(label.mini)} text={"© 2022  ТЦ Веневский"}/>
                </div>
                
                <div className={classNames(css.contacts)}>
                    <Contacts/>
                </div>
                
                <div className={classNames(css.navs)}>
                    {navs.map(nav => {
                        return(
                            <InnerLink className={classNames(link.underlined)} key={nav.title} to={nav.to}>
                                <Label className={classNames(label.mini)} text={nav.title}/>
                            </InnerLink>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
};

export default memo(Footer);