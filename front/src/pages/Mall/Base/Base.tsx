import {observer} from "mobx-react-lite";
import {Outlet, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";

import Header from "../../../components/Header";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import Main from "../../../components/Main";
import Loader from "../../../components/Loader";

import NavigationStore from "../../../stores/NavigationStore";
import Breadcrumb from "../../../api/interfaces/breadcrumb/Breadcrumb";

const Base = () => {
    const location = useLocation();
	const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>();
    
    useEffect(() => {
		const setupRoutes = async () => {
			await NavigationStore.getAsync("");
			NavigationStore.toNext(location.pathname);
			setBreadcrumbs(NavigationStore.get());
		};
		
		void setupRoutes();
    }, [location]);
	
	if (!breadcrumbs) {
		return null;
	}
    
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