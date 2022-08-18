import {observer} from "mobx-react-lite";
import {Outlet, useLocation} from "react-router-dom";
import React, {useEffect} from "react";

import Header from "../../../components/Header";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import Main from "../../../components/Main";
import Loader from "../../../components/Loader";

import NavigationStore from "../../../stores/NavigationStore";

const Base = () => {
    const location = useLocation();
	const breadcrumbs = NavigationStore.get();
    
    useEffect(() => {
		const setupRoutes = async () => {
			await NavigationStore.getAsync("");
			NavigationStore.toNext(location.pathname);
		};
		
		void setupRoutes();
    }, [location]);

    return(
        <>
            <Header/>
            <Nav/>
            <Main breadcrumbs={breadcrumbs}>
                <React.Suspense fallback={<Loader/>}>
                    <Outlet/>
                </React.Suspense>
            </Main>
            <Footer/>
        </>
    );
};

export default observer(Base);