import Carousel from "better-react-carousel";
import classNames from "classnames";

import css from "./carousel.module.scss";
import link from "/src/components/Link/link.module.scss";
import label from "/src/components/Label/label.module.scss";

import {InnerLink} from "../Link";
import Label from "../Label";
import Image from "../Image";

const PicturesCarousel = ({ images, title, linkLabel, to, borderColor, rows, cols }: Props) => {
	return(
		<div className={classNames(css.wrapper, borderColor)}>
			<div className={classNames(css.info)}>
				<Label text={title} className={classNames(css.title, label.large, borderColor)}/>
				
				<InnerLink className={classNames(link.underlined)} to={to}>
					<Label className={classNames(label.mini)} text={linkLabel}/>
				</InnerLink>
			</div>
			
			<Carousel mobileBreakpoint={576} cols={cols} rows={rows} gap={10} loop>
				{
					images.map((image: Image, index) => {
						return(
							<Carousel.Item key={index}>
								<InnerLink className={classNames()} to={image.routePath}>
									<Image classes={classNames(css.item)} source={image.image}/>
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
	routePath: string
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