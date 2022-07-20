import {observer} from "mobx-react-lite";
import {Outlet, useLocation} from "react-router-dom";
import React, {useEffect} from "react";

import Header from "../../../components/Header";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import Main from "../../../components/Main";

import NavigationStore from "../../../stores/NavigationStore";

const Base = () => {
    const location = useLocation();
    
    useEffect(() => {
        NavigationStore.toNext(location.pathname);
    }, [location]);
    
    return(
        <>
            <Header/>
            <Nav/>
            <Main breadcrumbs={NavigationStore.get()}>
                <React.Suspense fallback={<>...</>}>
                    <Outlet/>
                </React.Suspense>
            </Main>
            <Footer/>
        </>
    );
};

export default observer(Base);