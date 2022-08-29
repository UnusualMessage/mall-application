import React, {PropsWithChildren, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

import AuthStore from "../../../stores/AuthStore";

const RequireAuth = ({ children }: PropsWithChildren) => {
	const redirect = useNavigate();
	const [allowed, setAllowed] = useState(false);
	
	useEffect(() => {
		const getResponse = async () => {
			await AuthStore.access();
			
			if (AuthStore.entered()) {
				setAllowed(true);
			} else {
				redirect("/key/authorization");
			}
		};
		
		void getResponse();
	}, []);
	
	if (!allowed) {
		return null;
	}
	
	return (
		<>
			{children}
		</>
	);
};

export default observer(RequireAuth);