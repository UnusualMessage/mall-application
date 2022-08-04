import {Outlet} from "react-router-dom";
import React from "react";

import Loader from "../../../components/Loader";
import Nav from "./Nav";
import Main from "./Main";

const Base = () => {
	return (
		<>
			<Nav/>
			<React.Suspense fallback={<Loader/>}>
				<Main>
					<Outlet/>
				</Main>
			</React.Suspense>
		</>
	);
};

export default Base;