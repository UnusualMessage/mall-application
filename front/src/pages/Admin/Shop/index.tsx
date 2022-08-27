import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {observer} from "mobx-react-lite";
import {Form, PageHeader, Space} from "antd";

import {SelectInput, TextInput, ImagePicker, RichTextInput, SocialsInput, CellPicker} from "../../../components/Form/inputs";
import Loader from "../../../components/Loader";
import {Update} from "../../../components/Form/buttons";

import ShopStore from "../../../stores/ShopStore";
import CategoryStore from "../../../stores/CategoryStore";
import {UpdateShop} from "../../../api/interfaces/shop";
import {Social} from "../../../api/interfaces/social";
import {getShopInitialOptions, getShopInitialValues, Values} from "../../../utils/forms/getShopForm";
import transliterate from "../../../utils/transliterate";
import {showMessage} from "../../../utils/showMessage";

const rootRoute = "shops";

const Shop = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [form] = Form.useForm();
	
	const shop = ShopStore.getCurrent();
	const categories = CategoryStore.get();
	
	const initialValues = useMemo(() => {
		return getShopInitialValues(shop);
	}, [shop]);
	
	const initialOptions = useMemo(() => {
		return getShopInitialOptions();
	}, [shop]);
	
	useEffect(() => {
		const getShop = async () => {
			await ShopStore.getByIdAsync(id ?? "");
			await CategoryStore.getAsync("");

			setIsLoading(false);
			
			if (!ShopStore.isRequestSuccessful()) {
				redirect(`../${rootRoute}`);
			}
		};
		
		void getShop();
	}, [id]);
	
	if (!shop) {
		return <Loader/>;
	}
	
	const handleUpdate = async (values: Values) => {
		const transliteratedTitle = transliterate(values.title);
		
		const socials: Social[] = [];
		
		for (const [key, value] of Object.entries(values.socials)) {
			if (value) {
				socials.push({
					id: shop.socials.find(social => social.name === key)?.id,
					name: key,
					site: value
				} as Social);
			}
		}
		
		const newShop: UpdateShop = {
			id: shop.id,
			title: values.title,
			description: values.description,
			schedule: values.schedule,
			site: values.site,
			phone: values.phone,
			categoryId: values.categoryId,
			imageId: values.logo.id,
			galleryIds: values.gallery.map(item => item.id),
			link: transliteratedTitle,
			routePath: `/${rootRoute}/${transliteratedTitle}/${shop.id}`,
			cellId: values.cellId,
			socials: socials
		};
		
		setIsLoading(true);
		await ShopStore.updateAsync(newShop);
		setIsLoading(false);
		
		await showMessage(ShopStore.isRequestSuccessful(),
			"Статья обновлена!",
			ShopStore.getErrorMessage());
	};
	
	const handleDelete = async () => {
		setIsLoading(true);
		await ShopStore.deleteAsync(id ?? "");
		setIsLoading(false);
		
		const successful = ShopStore.isRequestSuccessful();
		
		await showMessage(successful,
			"Статья удалена!",
			ShopStore.getErrorMessage());
		
		if (successful) {
			redirect(`../${rootRoute}`);
		}
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect(`../${rootRoute}`)}
			            title="Редактирование магазина"
			            subTitle={shop.title}
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form onFinish={handleUpdate} labelCol={{span: 24}} initialValues={initialValues} form={form}>
				<TextInput {...initialOptions.title}/>
				<CellPicker {...initialOptions.cellId} form={form}/>
				<TextInput {...initialOptions.schedule}/>
				<TextInput {...initialOptions.phone}/>
				<TextInput {...initialOptions.site}/>
				<ImagePicker {...initialOptions.logo} form={form}/>
				<ImagePicker {...initialOptions.gallery} form={form} multiple/>
				<SelectInput values={categories} {...initialOptions.categoryId}/>
				<SocialsInput/>
				<RichTextInput {...initialOptions.description} form={form}/>
				<Update isLoading={isLoading} handleDelete={handleDelete}/>
			</Form>
		</Space>
	);
};

export default observer(Shop);