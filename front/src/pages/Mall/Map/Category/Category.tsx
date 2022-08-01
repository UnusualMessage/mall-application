import {observer} from "mobx-react-lite";
import {useMemo, useRef} from "react";

import css from "./category.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../../../components/Label";
import Icon from "../../../../components/Icon";
import {Shops} from "../Shop";

import ShopStore from "../../../../stores/ShopStore";
import Category from "../../../../api/interfaces/category/Category";
import icons from "../../../../data/icons";
import useElementHider from "../../../../hooks/useElementHider";

const Category = ({ category }: Props) => {
	const defaultHeight = 0;
	
	const shops = useMemo(() => {
		return ShopStore.getByCategory(category.id);
	}, [category.id]);
	
	if (shops.length === 0) {
		return null;
	}
	
	const targetRef = useRef<HTMLDivElement>(null);
	const [hider, setHider] = useElementHider({ targetRef, defaultHeight });
	
	const onClick = () => {
		const hidden = !hider.hidden;
		if (hider.hidden) {
			setHider({
				maxHeight: targetRef.current?.scrollHeight + "px",
				hidden: hidden
			});
		} else {
			setHider({
				maxHeight: defaultHeight + "px",
				hidden: hidden
			});
		}
	};
	
	let classes = `${css.icon}`;
	if (!hider.hidden) {
		classes = `${css.icon} ${css.active}`;
	}
 
	return(
		<div className={`${css.wrapper}`}>
			<div className={`${css.header}`} onClick={onClick}>
				<div className={`${css.title}`}>
					<Label text={ShopStore.getCountByCategoryId(category.id).toString()} className={`${label.default} ${label.bold}`}/>
					<Label text={category.title} className={`${label.default}`}/>
				</div>
				
				<div className={classes}>
					<Icon className={""} viewBox={"0 0 512 512"} icon={icons.menu}/>
				</div>
			</div>
			
			<div className={css.list} ref={targetRef} style={{ maxHeight: hider.maxHeight }}>
				<Shops shops={shops}/>
			</div>
		</div>
		
	);
};

interface Props {
	category: Category
}

export default observer(Category);