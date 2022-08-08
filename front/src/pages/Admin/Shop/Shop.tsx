import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from "react";
import classNames from "classnames";

import css from "./shop.module.scss";

import Image from "../../../components/Image";
import Input from "../../../components/Input";

import ShopInterface from "../../../api/interfaces/shop/Shop";
import shops from "../../../data/shops";
import InterfaceStore from "../../../stores/InterfaceStore";
import Select from "../../../components/Select/Select";
import categories from "../../../data/categories";
import useForm from "../../../hooks/useForm";
import transliterate from "../../../utils/transliterate";

const Shop = () => {
	const { id } = useParams();
	const redirect = useNavigate();
	
	const [shop, setShop] = useState<ShopInterface>();
	const [buttonsDisabled, setButtonsDisabled] = useState(false);
	
	const form = useMemo(() => {
		return {
			title: {
				type: "text",
				value: shop?.title
			},
			
			floor: {
				type: "text",
				value: shop?.floor
			},
			
			schedule: {
				type: "text",
				value: shop?.schedule
			},
			
			phone: {
				type: "text",
				value: shop?.phone
			},
			
			site: {
				type: "text",
				value: shop?.site
			},
			
			category: {
				type: "text",
				value: shop?.categories[1].title
			}
		};
	}, [shop]);
	
	const { inputs, handleSubmit } = useForm({ form: form });
	const { title, floor, schedule, phone, site, category } = inputs;
	
	const lockInterface = useCallback(() => {
		setButtonsDisabled(true);
		InterfaceStore.setLoading(true);
	}, []);
	
	const unlockInterface = useCallback(() => {
		setButtonsDisabled(false);
		InterfaceStore.setLoading(false);
	}, []);
	
	useEffect(() => {
		const shop = shops.find(shop => shop.link === id);
		
		if (!shop) {
			redirect("../");
		}
		
		setShop(shop);
	}, [id]);
	
	if (!shop) {
		return null;
	}
	
	const onSubmit = (values: Record<string, string>) => {
		return;
	};
	
	return(
		<form className={classNames(css.wrapper)} onSubmit={handleSubmit(onSubmit)}>
			<Image classes={classNames(css.image)} source={shop.image}/>
			
			<div className={`${css.info}`}>
				<Input label={"Название"}
				       type={"text"}
				       placeholder={"Введите название магазина"}
				       defaultValue={shop.title}
				       name={"title"}
				       onChange={title.onChange}
				/>
				
				<Input label={"Этаж"}
				       type={"text"}
				       placeholder={"Введите номер этажа"}
				       defaultValue={shop.floor}
				       name={"floor"}
				       onChange={floor.onChange}
				/>
				
				<Input label={"Время"}
				       type={"text"}
				       placeholder={"Введите время работы"}
				       defaultValue={shop.schedule}
				       name={"schedule"}
				       onChange={schedule.onChange}
				/>
				
				<Input label={"Телефон"}
				       type={"text"}
				       placeholder={"Введите номер телефона"}
				       defaultValue={shop.phone}
				       name={"phone"}
				       onChange={phone.onChange}
				/>
				
				<Input label={"Сайт"}
				       type={"text"}
				       placeholder={"Введите адрес сайта"}
				       defaultValue={shop.site}
				       name={"site"}
				       onChange={site.onChange}
				/>
				
				<Select values={categories} onChange={category.onChange} label={"Выбор категории"}/>
				
				<Input label={"Текст статьи"}
				       type={"text"}
				       placeholder={"Введите текст статьи"}
				       defaultValue={shop.description}
				       name={"description"}
				       onChange={site.onChange}
				/>
			</div>
			
			<div className={classNames(css.buttons)}>
				<button type={"submit"} >
					Изменить
				</button>
				
				<button type={"submit"}>
					Удалить
				</button>
			</div>
		</form>
	);
};

export default Shop;