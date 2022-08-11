import classNames from "classnames";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {runInAction} from "mobx";

import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Label from "../../../components/Label";
import CategoryBar from "./CategoryBar";
import {InnerLink} from "../../../components/Link";

import CategoryStore from "../../../stores/CategoryStore";
import Category from "../../../api/interfaces/category/Category";

const Categories = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	
	useEffect(() => {
		const getCategories = async () => {
			const categories = await CategoryStore.getAsync("");
			setCategories(categories);
		};
		
		void getCategories();
	}, []);
	
	return (
		<>
			<InnerLink className={""} to={"new"}>
				<Label className={classNames(label.big, link.underlined)} text={"Добавить категорию"}/>
			</InnerLink>
			{
				categories.map(category => {
					return (
						<CategoryBar title={category.title} to={category.id} key={category.id}/>
					);
				})
			}
		</>
	);
};

export default observer(Categories);