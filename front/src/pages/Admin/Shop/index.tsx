import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Form, PageHeader, Popconfirm, Space} from "antd";

import {SelectInput, TextInput, NumberInput, ImagePicker, RichTextInput, SocialInput} from "../../../components/Input";
import Loader from "../../../components/Loader";

import ShopStore from "../../../stores/ShopStore";
import CategoryStore from "../../../stores/CategoryStore";
import {UpdateShop} from "../../../api/interfaces/shop";
import {Social} from "../../../api/interfaces/social";
import {socials} from "../../../types/Social";
import {getShopInitialOptions, getShopInitialValues, Values} from "../../../utils/getShopForm";
import transliterate from "../../../utils/transliterate";

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
			
			const shop = ShopStore.getCurrent();
			
			setIsLoading(false);
			
			if (!shop) {
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
			floor: values.floor,
			schedule: values.schedule,
			site: values.site,
			phone: values.phone,
			categoryId: values.categoryId,
			imageId: values.image.id,
			link: transliteratedTitle,
			routePath: `/${rootRoute}/${transliteratedTitle}/${shop.id}`,
			socials: socials
		};
		
		setIsLoading(true);
		await ShopStore.updateAsync(newShop);
		setIsLoading(false);
	};
	
	const handleDelete = async () => {
		setIsLoading(true);
		await ShopStore.deleteAsync(id ?? "");
		setIsLoading(false);
		
		if (ShopStore.isRequestSuccessful()) {
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
				<NumberInput {...initialOptions.floor} min={1} max={2}/>
				<TextInput {...initialOptions.schedule}/>
				<TextInput {...initialOptions.phone}/>
				<TextInput {...initialOptions.site}/>
				<ImagePicker {...initialOptions.image} form={form}/>
				<SelectInput values={categories} {...initialOptions.categoryId}/>
				
				<Form.Item label={"Социальные сети"}>
					<Space wrap>
						{
							socials.map(social => <SocialInput social={social} key={social}/>)
						}
					</Space>
				</Form.Item>
				
				<RichTextInput {...initialOptions.description} form={form}/>
				
				<Space>
					<Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
						Изменить
					</Button>
					
					<Popconfirm title={"Удалить?"} okText={"Да"} cancelText={"Нет"} onConfirm={handleDelete}>
						<Button type="primary" danger loading={isLoading} disabled={isLoading}>
							Удалить
						</Button>
					</Popconfirm>
				</Space>
			</Form>
		</Space>
	);
};

export default observer(Shop);