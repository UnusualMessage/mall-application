import css from "./nav.module.scss";

import Link from "./Link";

import navs from "../../data/navs";

const Nav = () => {
    return(
        <nav className={`${css.wrapper}`}>
            <div className={`${css.inner}`}>
                {
                    navs.map(nav => {
                        return(
                            <Link key={nav.title} title={nav.title} to={nav.to} viewBox={nav.viewBox}>
                                {nav.icon}
                            </Link>
                        );
                    })
                }
            </div>
        </nav>
    );
};

export default Nav;