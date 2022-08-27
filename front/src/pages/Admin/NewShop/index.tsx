import {useEffect, useMemo, useState} from "react";
import {observer} from "mobx-react-lite";
import {Form, PageHeader, Space} from "antd";
import {useNavigate} from "react-router-dom";

import {SelectInput, TextInput, ImagePicker, RichTextInput, SocialsInput} from "../../../components/Form/inputs";
import Loader from "../../../components/Loader";
import CellPicker from "../../../components/Form/inputs/CellPicker";
import {Create} from "../../../components/Form/buttons";

import {CreateShop} from "../../../api/interfaces/shop";
import {CreateSocial} from "../../../api/interfaces/social";
import CategoryStore from "../../../stores/CategoryStore";
import InterfaceStore from "../../../stores/InterfaceStore";
import ShopStore from "../../../stores/ShopStore";
import {getShopInitialOptions, getShopInitialValues, Values} from "../../../utils/forms/getShopForm";
import transliterate from "../../../utils/transliterate";
import {showMessage} from "../../../utils/showMessage";

const rootRoute = "shops";

const NewShop = () => {
	const redirect = useNavigate();
	const [form] = Form.useForm();
	const [isFetching, setIsFetching] = useState(true);
	const interfaceLocked = InterfaceStore.isLoading();
	
	const categories = CategoryStore.get();
	
	const initialValues = useMemo(() => {
		return getShopInitialValues();
	}, []);
	
	const initialOptions = useMemo(() => {
		return getShopInitialOptions();
	}, []);
	
	useEffect(() => {
		const getCategories = async () => {
			await CategoryStore.getAsync("");
			setIsFetching(false);
		};
		
		void getCategories();
	}, []);
	
	if (isFetching) {
		return <Loader/>;
	}
	
	const handleCreate = async (values: Values) => {
		const transliteratedTitle = transliterate(values.title);
		
		const socials: CreateSocial[] = [];
		
		for (const [key, value] of Object.entries(values.socials)) {
			socials.push({
				name: key,
				site: value
			} as CreateSocial);
		}
		
		const newShop: CreateShop = {
			title: values.title,
			description: values.description,
			cellId: values.cellId,
			schedule: values.schedule,
			site: values.site,
			phone: values.phone,
			categoryId: values.categoryId,
			imageId: values.logo.id,
			link: transliteratedTitle,
			galleryIds: values.gallery.map(item => item.id),
			routePath: `/${rootRoute}/${transliteratedTitle}`,
			socials: socials
		};
		
		InterfaceStore.setLoading(true);
		await ShopStore.createAsync(newShop);
		InterfaceStore.setLoading(false);
		
		await showMessage(ShopStore.isRequestSuccessful(),
			"Статья добавлена!",
			ShopStore.getErrorMessage());
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect(`../${rootRoute}`)}
			            title="Добавление магазина"
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form form={form} onFinish={handleCreate} labelCol={{span: 24}} initialValues={initialValues} labelWrap>
				<TextInput {...initialOptions.title}/>
				<CellPicker {...initialOptions.cellId} form={form}/>
				<TextInput {...initialOptions.schedule}/>
				<TextInput {...initialOptions.phone}/>
				<TextInput {...initialOptions.site}/>
				<ImagePicker {...initialOptions.logo} form={form}/>
				<ImagePicker {...initialOptions.gallery} form={form} multiple/>
				<SelectInput values={categories} {...initialOptions.categoryId}/>
				<SocialsInput/>
				<RichTextInput form={form} {...initialOptions.description} empty/>
				<Create isLoading={interfaceLocked} form={form}/>
			</Form>
		</Space>
	);
};

export default observer(NewShop);