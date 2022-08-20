import {useEffect, useMemo, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Form, PageHeader, Space} from "antd";
import {useNavigate} from "react-router-dom";

import {SelectInput, TextInput, NumberInput, ImagePicker, RichTextInput, SocialInput} from "../../../components/Input";
import Loader from "../../../components/Loader";

import {CreateShop} from "../../../api/interfaces/shop";
import {CreateSocial} from "../../../api/interfaces/social";
import {socials} from "../../../types/Social";
import CategoryStore from "../../../stores/CategoryStore";
import InterfaceStore from "../../../stores/InterfaceStore";
import ShopStore from "../../../stores/ShopStore";
import {getShopInitialOptions, getShopInitialValues, Values} from "../../../utils/getShopForm";
import transliterate from "../../../utils/transliterate";

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
			floor: values.floor,
			schedule: values.schedule,
			site: values.site,
			phone: values.phone,
			categoryId: values.categoryId,
			imageId: values.image.id,
			link: transliteratedTitle,
			routePath: `/${rootRoute}/${transliteratedTitle}`,
			socials: socials
		};
		
		InterfaceStore.setLoading(true);
		await ShopStore.createAsync(newShop);
		InterfaceStore.setLoading(false);
	};
	
	return(
		<Space direction={"vertical"} style={{width: "100%"}}>
			<PageHeader onBack={() => redirect(`../${rootRoute}`)}
			            title="Добавление магазина"
			            style={{padding: 0, paddingBottom: 20}}
			/>
			
			<Form form={form} onFinish={handleCreate} labelCol={{span: 24}} initialValues={initialValues} labelWrap>
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
				
				<RichTextInput form={form} {...initialOptions.description} empty/>
				
				<Space>
					<Button type="primary" htmlType="submit" loading={interfaceLocked} disabled={interfaceLocked}>
						Добавить
					</Button>
					
					<Button type="dashed" onClick={() => form.resetFields()}>
						Очистить
					</Button>
				</Space>
			</Form>
		</Space>
	);
};

export default observer(NewShop);