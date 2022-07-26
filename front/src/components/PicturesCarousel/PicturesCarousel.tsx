import Carousel from "better-react-carousel";
import {FC} from "react";

import css from "./carousel.module.scss";
import link from "/src/components/Link/link.module.scss";
import label from "/src/components/Label/label.module.scss";

import {InnerLink} from "../Link";
import Label from "../Label";
import Image from "../Image";

const PicturesCarousel: FC<Props> = ({ images,
	                                     title,
	                                     linkLabel,
	                                     to,
	                                     borderColor,
	                                     rows,
	                                     cols }) => {
	return(
		<div className={`${css.wrapper} ${borderColor}`}>
			<div className={css.info}>
				<Label text={title} className={`${css.title} ${label.large} ${borderColor}`}/>
				
				<InnerLink className={`${link.underlined}`} to={to}>
					<Label text={linkLabel} className={`${label.mini}`}/>
				</InnerLink>
			</div>
			
			<Carousel mobileBreakpoint={576} cols={cols} rows={rows} gap={10} loop>
				{
					images.map((image: Image, index) => {
						return(
							<Carousel.Item key={index}>
								<InnerLink className={""} to={"/" + image.route}>
									<Image classes={`${css.item}`} source={image.image}/>
								</InnerLink>
							</Carousel.Item>
						);
					})
				}
			</Carousel>
		</div>
	);
};

interface Image {
	image: string,
	route: string
}

interface Props {
	images: Image[]
	title: string,
	linkLabel: string,
	borderColor: string,
	to: string,
	cols: number,
	rows: number
}

export default PicturesCarousel;