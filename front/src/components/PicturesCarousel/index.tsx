import Carousel from "better-react-carousel";
import classNames from "classnames";
import React, {memo} from "react";
import {Typography} from "antd";

import css from "./index.module.scss";
import link from "/src/components/Link/link.module.scss";
import label from "/src/components/Label/label.module.scss";

import {InnerLink} from "../Link";
import Label from "../Label";
import Image from "../Image";

import ImageInterface from "../../api/interfaces/image/Image";

const PicturesCarousel = ({ items, title, linkLabel, to, borderColor, rows, cols }: Props) => {
	return(
		<div className={classNames(css.wrapper, borderColor)}>
			<div className={classNames(css.info)}>
				<Typography.Title className={classNames(css.title, label.large, borderColor)} level={3}>
					{title}
				</Typography.Title>
				
				<InnerLink className={classNames(link.underlined)} to={to}>
					<Label className={classNames(label.mini)} text={linkLabel}/>
				</InnerLink>
			</div>
			
			<Carousel mobileBreakpoint={576} cols={cols} rows={rows} gap={10} loop>
				{
					items.map((item: Item, index) => {
						return(
							<Carousel.Item key={index}>
								<InnerLink className={classNames()} to={item.routePath}>
									<Image classes={classNames(css.item)} source={item.image.path}/>
								</InnerLink>
							</Carousel.Item>
						);
					})
				}
			</Carousel>
		</div>
	);
};

export interface Item {
	image: ImageInterface,
	routePath: string
}

interface Props {
	items: Item[]
	title: string,
	linkLabel: string,
	borderColor: string,
	to: string,
	cols: number,
	rows: number
}

export default memo(PicturesCarousel);