import css from "./image.module.scss";
import {useState} from "react";
import Loader from "../Loader";

const Image = ({classes, source}: Props) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	
	return(
		<div className={`${css.wrapper} ${classes}`}>
			{
				imageLoaded ? null : <Loader/>
			}

			<img className={`${css.default}`} src={source} alt={""}
			     style={imageLoaded ? {} : { display: "none" }}
			     onLoad={() => setImageLoaded(true)}/>
		</div>
	);
};

interface Props {
	classes: string,
	source: string
}

export default Image;