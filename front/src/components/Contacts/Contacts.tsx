import css from "./contacts.module.scss";
import label from "../Label/label.module.scss";

import Label from "../Label";

import contacts from "../../data/contacts";

const Contacts = ({ className }: Props) => {
	return(
		<>
			<div className={`${css.info} ${className}`}>
				<Label text={contacts.city} className={`${label.bold}`}/>
				<Label text={contacts.street} className={`${label.mini}`}/>
			</div>
			
			<div className={`${css.info} ${className}`}>
				<Label text={contacts.schedule} className={`${label.bold}`}/>
				<Label text={"Время работы"} className={`${label.mini}`}/>
			</div>
			
			<div className={`${css.info} ${className}`}>
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