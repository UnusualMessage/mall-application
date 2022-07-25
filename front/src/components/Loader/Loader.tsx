import css from "./loader.module.scss";

const Loader = () => {
	return(
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className={`${css.default}`}
				viewBox="0 0 270.93 270.93"
				style={{gridColumn: "1 / 2", gridRow: "1 / 2"}}
			>
				<path fill="#00000000" strokeWidth="0.07" d="M0 0H270.93V270.93H0z"></path>
			</svg>
			<div className={`${css.wrapper}`}/>
		</>
	);
};

export default Loader;