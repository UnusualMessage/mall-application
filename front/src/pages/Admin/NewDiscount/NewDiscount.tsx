import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "../discount.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../../components/Label";
import Hider from "../../../components/Hider";

const NewDiscount = () => {
	return(
		<div className={classNames(css.wrapper)}>
			<Hider className={classNames(css.description)} defaultHeight={230}>
				<Label className={classNames(label.default)} text={"Discount"}/>
			</Hider>
		</div>
	);
};

export default observer(NewDiscount);