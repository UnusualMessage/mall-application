import classNames from "classnames";

import css from "./eventCard.module.scss";
import label from "/src/components/Label/label.module.scss";

import Image from "../../../../components/Image";
import {InnerLink} from "../../../../components/Link";
import Label from "../../../../components/Label";

import Event from "../../../../api/interfaces/event/Event";

const EventCard = ({ event }: Props) => {
	return(
		<InnerLink className={classNames(css.wrapper)} to={event.link}>
			<div className={classNames(css.info)}>
				<Label className={classNames(css.title, label.default, label.white, label.bold)} text={event.title}/>
			</div>
			<Image classes={classNames(css.logo)} source={event.image.path}/>
		</InnerLink>
	);
};

interface Props {
	event: Event
}


export default EventCard;