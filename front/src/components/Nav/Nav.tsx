import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "./nav.module.scss";

import NavLink from "./NavLink";

import navs from "../../data/navs";
import InterfaceStore from "../../stores/InterfaceStore";

const Nav = () => {
    const classes = classNames({
        [css.wrapper]: true,
        [css.burger]: InterfaceStore.isMenuActive()
    });
    
    return(
        <nav className={classes}>
            <div className={classNames(css.inner)}>
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