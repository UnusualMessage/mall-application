import classNames from "classnames";
import {useEffect, useState} from "react";

import css from "./contacts.module.scss";
import label from "../Label/label.module.scss";

import Label from "../Label";
import Loader from "../Loader";

import ContactsStore from "../../stores/ContactsStore";

const Contacts = ({ className }: Props) => {
	const [isFetching, setIsFetching] = useState(true);
	
	const contacts = ContactsStore.get();
	
	useEffect(() => {
		const getContacts = async () => {
			await ContactsStore.getAsync();
			setIsFetching(false);
		};
		
		void getContacts();
	}, []);
	
	if (!contacts || isFetching) {
		return <Loader/>;
	}
	
	const classes = classNames(css.info, className);
	
	return(
		<>
			<div className={classes}>
				<Label text={contacts.city} className={`${label.bold}`}/>
				<Label text={contacts.street} className={`${label.mini}`}/>
			</div>
			
			<div className={classes}>
				<Label text={contacts.schedule} className={`${label.bold}`}/>
				<Label text={"Время работы"} className={`${label.mini}`}/>
			</div>
			
			<div className={classes}>
				<Label text={contacts.phone} className={`${label.bold}`}/>
				<Label text={"Контактный телефон"} className={`${label.mini}`}/>
			</div>
		</>
	);
};

interface Props {
	className?: string
}

export default Contacts;