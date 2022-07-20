import css from "./image.module.scss";
import {useState} from "react";

const Image = ({classes, source}: Props) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	
	return(
		<div className={`${css.wrapper} ${classes}`}>
			{imageLoaded ? null :
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={`${css.default}`}
						viewBox="0 0 270.93 270.93"
						style={{gridColumn: "1 / 2", gridRow: "1 / 2"}}
					>
						<path fill="#00000000" strokeWidth="0.07" d="M0 0H270.93V270.93H0z"></path>
					</svg>
					<div className={`${css.spinner}`}/>
				</>
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