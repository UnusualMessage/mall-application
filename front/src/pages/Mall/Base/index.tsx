import {observer} from "mobx-react-lite";
import {Outlet} from "react-router-dom";
import React from "react";

import Header from "../../../components/Header";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import Main from "../../../components/Main";
import Loader from "../../../components/Loader";

const Base = () => {
	return(
		<>
			<Header/>
			<Nav/>
			<Main>
				<React.Suspense fallback={<Loader/>}>
					<Outlet/>
				</React.Suspense>
			</Main>
			<Footer/>
		</>
	);
};

export default observer(Base);