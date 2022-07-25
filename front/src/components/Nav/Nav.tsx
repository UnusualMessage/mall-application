import {observer} from "mobx-react-lite";

import css from "./nav.module.scss";

import NavLink from "./Link";

import navs from "../../data/navs";

const Nav = () => {
    return(
        <nav className={`${css.wrapper}`}>
            <div className={`${css.inner}`}>
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