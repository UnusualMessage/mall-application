import {useMemo} from "react";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

import css from "./authorization.module.scss";

import {TextInput} from "../../../components/Input";

import getAuthForm from "../../../utils/getAuthForm";
import useForm, {Values} from "../../../hooks/useForm";
import AuthenticateUser from "../../../api/interfaces/user/AuthenticateUser";
import AuthStore from "../../../stores/AuthStore";

const Authorization = () => {
	const redirect = useNavigate();
	
	const form = useMemo(() => {
		return getAuthForm();
	}, []);
	
	const { inputs, handleSubmit } = useForm({ form: form });
	const { login, password } = inputs;
	
	const authenticate = async (values: Values) => {
		const user: AuthenticateUser = {
			login: values.login,
			password: values.password,
		};
		
		await AuthStore.authenticateUser(user);
		console.log(AuthStore.entered());
		if (AuthStore.entered()) {
			redirect("/admin/shops");
		}
	};
	
	return (
		<div className={css.wrapper}>
			<form className={css.form} onSubmit={handleSubmit(authenticate)}>
				<TextInput {...form.login.options} onChange={login.onChange}/>
				<TextInput {...form.password.options} onChange={password.onChange}/>
			</form>
		</div>
	);
};

export default observer(Authorization);