import {observer} from "mobx-react-lite";

import css from "./nav.module.scss";

import NavLink from "./Link";

import navs from "../../data/navs";
import InterfaceStore from "../../stores/InterfaceStore";

const Nav = () => {
    let menuStyle;
    
    if (InterfaceStore.isMenuActive()) {
        menuStyle = `${css.inner} ${css.burger}`;
    } else {
        menuStyle = `${css.inner}`;
    }
    
    return(
        <nav className={`${css.wrapper}`}>
            <div className={menuStyle}>
                {
                    navs.map(nav => {
                        return(
                            <NavLink key={nav.title} title={nav.title} to={nav.to} viewBox={nav.viewBox}>
                                {nav.icon}
                            </NavLink>
                        );
                    })
                }
            </div>
        </nav>
    );
};

export default observer(Nav);