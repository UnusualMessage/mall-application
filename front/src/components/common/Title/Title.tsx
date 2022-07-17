import label from "../Label/label.module.scss";

const Title = ({ classes, text }: Props) => {
	return(
		<h1>
			<span className={`${label.big} ${classes}`}>
				{text}
			</span>
		</h1>
	);
};

interface Props {
	classes: string,
	text: string
}

export default Title;