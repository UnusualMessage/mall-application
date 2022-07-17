import css from "./footer.module.scss";
import label from "../common/Label/label.module.scss";
import inner from "../common/Inner/inner.module.scss";
import outer from "../common/Outer/outer.module.scss";

import Image from "../common/Image";
import Label from "../common/Label";
import Inner from "../common/Inner";
import Outer from "../common/Outer";
import Icon from "../common/Icon";

import contacts from "../../data/contacts";
import icons from "../../data/icons";
import navs from "../../data/navs";

const Footer = () => {
    return(
        <footer className={`${css.wrapper}`}>
            <div className={`${css.inner}`}>
                <div className={`${css.start}`}>
                    <Image classes={`${css.logo}`} source={"/Logo.png"}/>
    
                    <div className={`${css.socials}`}>
                        <Outer classes={`${outer.hovered}`} to={"https://vk.com"}>
                            <Icon viewBox={"0 0 95.481 95.481"} classes={""}>
                                {icons.vk}
                            </Icon>
                        </Outer>
        
                        <Outer classes={`${outer.hovered}`} to={"https://vk.com"}>
                            <Icon viewBox={"0 0 20 20"} classes={""}>
                                {icons.odnoklassniki}
                            </Icon>
                        </Outer>
                    </div>
                    
                    <Label text={"© 2022  ТЦ Веневский"} classes={`${label.mini}`}/>
                </div>
                
                <div className={`${css.contacts}`}>
                    <div className={`${css.info}`}>
                        <Label text={contacts.city} classes={`${label.bold}`}/>
                        <Label text={contacts.street} classes={`${label.mini}`}/>
                    </div>
    
                    <div className={`${css.info}`}>
                        <Label text={contacts.schedule} classes={`${label.bold}`}/>
                        <Label text={"Время работы"} classes={`${label.mini}`}/>
                    </div>
    
                    <div className={`${css.info}`}>
                        <Label text={contacts.phone} classes={`${label.bold}`}/>
                        <Label text={"Контактный телефон"} classes={`${label.mini}`}/>
                    </div>
                </div>
                
                <div className={`${css.navs}`}>
                    {navs.map(nav => {
                        return(
                            <Inner key={nav.title} classes={`${inner.underlined}`} to={nav.to}>
                                <Label text={nav.title} classes={`${label.mini}`}/>
                            </Inner>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
};

export default Footer;