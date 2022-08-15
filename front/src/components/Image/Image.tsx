import {useState} from "react";
import classNames from "classnames";

import css from "./image.module.scss";

import Loader from "../Loader";

const Image = ({classes, source}: Props) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	
	return(
		<div className={classNames(css.wrapper, classes)}>
			{
				imageLoaded ? null : <Loader/>
			}

			<img className={classNames({ [css.default]: true, [css.hidden]: !imageLoaded })}
			     src={source}
			     alt={""}
			     onLoad={() => setImageLoaded(true)}/>
		</div>
	);
};

interface Props {
	classes: string,
	source: string,
}

export default Image;