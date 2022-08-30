import classNames from "classnames";
import {useEffect, useState} from "react";
import {Skeleton} from "antd";

import css from "./index.module.scss";
import label from "../Label/label.module.scss";

import Label from "../Label";

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
	
	const hidden = !contacts || isFetching;
	
	const classes = classNames(css.info, className);
	
	return(
		<>
			{
				hidden
					?
					<Skeleton.Input size={"small"} active className={classes}/>
					:
					<div className={classes}>
						<Label text={contacts.city} className={`${label.bold}`}/>
						<Label text={contacts.street} className={`${label.mini}`}/>
					</div>
			}
			
			{
				hidden
					?
					<Skeleton.Input size={"small"} active className={classes}/>
					:
					<div className={classes}>
						<Label text={contacts.schedule} className={`${label.bold}`}/>
						<Label text={"Время работы"} className={`${label.mini}`}/>
					</div>
			}
			
			{
				hidden
					?
					<Skeleton.Input size={"small"} active className={classes}/>
					:
					<div className={classes}>
						<Label text={contacts.phone} className={`${label.bold}`}/>
						<Label text={"Контактный телефон"} className={`${label.mini}`}/>
					</div>
			}
		</>
	);
};

interface Props {
	className?: string
}

export default Contacts;