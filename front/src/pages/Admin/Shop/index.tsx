import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Form, PageHeader, Popconfirm, Space} from "antd";

import {ImageInput, SelectInput, TextInput} from "../../../components/Input";

import ShopInterface from "../../../api/interfaces/shop/Shop";
import InterfaceStore from "../../../stores/InterfaceStore";
import ShopStore from "../../../stores/ShopStore";
import transliterate from "../../../utils/transliterate";
import UpdateShop from "../../../api/interfaces/shop/UpdateShop";
import Category from "../../../api/interfaces/category/Category";
import CategoryStore from "../../../stores/CategoryStore";
import shops from "../../../data/shops";
import categoriesData from "../../../data/categories";
import {getShopInitialOptions, getShopInitialValues, Values} from "../../../utils/getShopForm";

const rootRoute = "shops";

const Shop = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	const isLoading = InterfaceStore.isLoading();
	
	const [shop, setShop] = useState<ShopInterface>();
	const [categories, setCategories] = useState<Category[]>([]);
	
	const initialValues = useMemo(() => {
		return getShopInitialValues(shop);
	}, [shop]);
	
	const initialOptions = useMemo(() => {
		return getShopInitialOptions();
	}, [shop]);
	
	useEffect(() => {
		const getShop = async () => {
			const shops = await ShopStore.getAsync(`Filters=Id==${id}`);
			const categories = await CategoryStore.getAsync("");
			
			if (shops.length !== 0) {
				setShop(shops[0]);
				setCategories(categories);
			} else {
				redirect(`../${rootRoute}`);
			}
		};
		
		setShop(shops.find(item => item.id === id));
		setCategories(categoriesData);
		// void getShop();
	}, [id]);
	
	if (!shop) {
		return null;
	}
	
	const handleUpdate = async (values: Values) => {
		const transliteratedTitle = transliterate(values.title);
		
		const newShop: UpdateShop = {
			id: shop.id,
			title: values.title,
			description: values.description,
			floor: values.floor,
			schedule: values.schedule,
			site: values.site,
			phone: values.phone,
			categories: [values.category],
			image: values.image[0].originFileObj as File,
			link: transliteratedTitle,
			routePath: `/${shops}/${transliteratedTitle}`
		};
		
		InterfaceStore.setLoading(true);
		// await ShopStore.updateAsync(newShop);
		InterfaceStore.setLoading(false);
	};
	
	const handleDelete = async () => {
		InterfaceStore.setLoading(true);
		// await ShopStore.deleteAsync({ id: shop.id });
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect(`../${rootRoute}`)}
			            title="Редактирование магазина"
			            subTitle={shop.title}
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form onFinish={handleUpdate} labelCol={{span: 24}} initialValues={initialValues}>
				<TextInput {...initialOptions.title}/>
				<TextInput {...initialOptions.floor}/>
				<TextInput {...initialOptions.schedule}/>
				<TextInput {...initialOptions.phone}/>
				<TextInput {...initialOptions.site}/>
				<ImageInput {...initialOptions.image}/>
				<SelectInput values={categories} {...initialOptions.category}/>
				<TextInput {...initialOptions.description}/>
				
				<Space>
					<Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
						Добавить
					</Button>
					
					<Popconfirm title={"Удалить статью?"} okText={"Да"} cancelText={"Нет"} onConfirm={handleDelete}>
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