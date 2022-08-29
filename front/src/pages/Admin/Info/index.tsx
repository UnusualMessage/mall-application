import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {Form, PageHeader, Space} from "antd";

import Loader from "../../../components/Loader";
import {TextInput} from "../../../components/Form/inputs";
import {Update} from "../../../components/Form/buttons";

import InterfaceStore from "../../../stores/InterfaceStore";
import ContactsStore from "../../../stores/ContactsStore";
import {getContactsInitialOptions, getContactsInitialValues, Values} from "../../../utils/forms/getInfoForm";
import {UpdateContacts} from "../../../api/interfaces/contacts";
import AuthStore from "../../../stores/AuthStore";

const Info = () => {
	const redirect = useNavigate();
	const [isFetching, setIsFetching] = useState(true);
	
	const interfaceLocked = InterfaceStore.isLoading();
	const contacts = ContactsStore.get();
	
	const initialValues = useMemo(() => {
		return getContactsInitialValues(contacts);
	}, [contacts]);
	
	const initialOptions = useMemo(() => {
		return getContactsInitialOptions();
	}, [contacts]);
	
	useEffect(() => {
		const getCategory = async () => {
			await ContactsStore.getAsync();
			setIsFetching(false);
		};
		
		void getCategory();
	}, []);
	
	if (!contacts || isFetching) {
		return <Loader/>;
	}
	
	const handleUpdate = async (values: Values) => {
		const newContacts: UpdateContacts = {
			id: contacts.id,
			city: values.city,
			street: values.street,
			phone: values.phone,
			schedule: values.schedule,
		};
		
		await AuthStore.access();
		
		InterfaceStore.setLoading(true);
		await ContactsStore.updateAsync(newContacts, AuthStore.getAccessToken());
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect("../")}
			            title="Редактирование контактов"
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form onFinish={handleUpdate} labelCol={{span: 24}} initialValues={initialValues}>
				<TextInput {...initialOptions.city}/>
				<TextInput {...initialOptions.street}/>
				<TextInput {...initialOptions.phone}/>
				<TextInput {...initialOptions.schedule}/>
				<Update isLoading={interfaceLocked}/>
			</Form>
		</Space>
	);
};

export default Info;