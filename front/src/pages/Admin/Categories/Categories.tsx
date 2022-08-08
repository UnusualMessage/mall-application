import classNames from "classnames";

import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import Label from "../../../components/Label";
import CategoryBar from "./CategoryBar/CategoryBar";
import {InnerLink} from "../../../components/Link";

import CategoryStore from "../../../stores/CategoryStore";

const Categories = () => {
	return (
		<>
			<InnerLink className={""} to={"new"}>
				<Label className={classNames(label.big, link.underlined)} text={"Добавить статью"}/>
			</InnerLink>
			{
				CategoryStore.get().map(category => {
					return (
						<CategoryBar title={category.title} to={category.id} key={category.id}/>
					);
				})
			}
		</>
	);
};

export default Categories;