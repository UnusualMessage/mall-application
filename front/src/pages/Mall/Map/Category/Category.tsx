import {observer} from "mobx-react-lite";
import {useMemo, useRef} from "react";
import classNames from "classnames";

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
	
	const classes = classNames({
		[css.icon]: true,
		[css.active]: !hider.hidden
	});
 
	return(
		<div className={classNames(css.wrapper)}>
			<div className={classNames(css.header)} onClick={onClick}>
				<div className={classNames(css.title)}>
					<Label className={classNames(label.default, label.bold)} text={ShopStore.getCountByCategoryId(category.id).toString()}/>
					<Label className={classNames(label.default)} text={category.title}/>
				</div>
				
				<div className={classes}>
					<Icon className={classNames()} viewBox={"0 0 512 512"} icon={icons.menu}/>
				</div>
			</div>
			
			<div className={classNames(css.list)} ref={targetRef} style={{ maxHeight: hider.maxHeight }}>
				<Shops shops={shops}/>
			</div>
		</div>
		
	);
};

interface Props {
	category: Category
}

export default observer(Category);