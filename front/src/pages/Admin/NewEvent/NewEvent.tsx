import {observer} from "mobx-react-lite";
import classNames from "classnames";

import css from "../event.module.scss";
import label from "/src/components/Label/label.module.scss";

import Label from "../../../components/Label";
import Hider from "../../../components/Hider";

const NewEvent = () => {
	return(
		<div className={classNames(css.wrapper)}>
			<Hider className={classNames(css.description)} defaultHeight={230}>
				<Label className={classNames(label.default)} text={"Event"}/>
			</Hider>
		</div>
	);
};

export default observer(NewEvent);