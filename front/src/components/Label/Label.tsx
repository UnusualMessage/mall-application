const Label = ({ text, className }: Props) => {
	return (
		<span className={`${className}`}>
			{text}
		</span>
	);
};

interface Props {
	text: string,
	className: string
}

export default Label;