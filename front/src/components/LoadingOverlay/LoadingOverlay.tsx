import classNames from "classnames";

import css from "./overlay.module.scss";

import Loader from "../Loader";

const LoadingOverlay = () => {
	return (
		<div className={classNames(css.wrapper)}>
			<Loader/>
		</div>
	);
};

export default LoadingOverlay;