import css from "./eventCard.module.scss";
import label from "/src/components/Label/label.module.scss";

import Image from "../../../../components/Image";
import {InnerLink} from "../../../../components/Link";
import Label from "../../../../components/Label";

import Event from "../../../../api/interfaces/event/Event";

const EventCard = ({ event }: Props) => {
	return(
		<InnerLink className={`${css.wrapper}`} to={event.link}>
			<div className={`${css.info}`}>
				<Label text={event.title} className={`${label.default} ${label.white} ${label.bold} ${css.title}`}/>
			</div>
			<Image classes={`${css.logo}`} source={event.image}/>
		</InnerLink>
	);
};

interface Props {
	event: Event
}


export default EventCard;