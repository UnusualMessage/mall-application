import {memo} from "react";
import classNames from "classnames";

import link from "/src/components/Link/link.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../../../components/Label";
import {InnerLink} from "../../../../components/Link";

import Shop from "../../../../api/interfaces/shop/Shop";

const Shop = ({ shop }: Props) => {
	return(
		<InnerLink className={classNames()} to={shop.routePath} key={shop.id}>
			<Label text={shop.title} className={classNames(label.mini, link.underlined)}/>
		</InnerLink>
	);
};

interface Props {
	shop: Shop
}

export default memo(Shop);