import {ButtonHTMLAttributes, DetailedHTMLProps, FC} from "react";

const Label: FC<Props> = ({ text, className, ...props }: Props) => {
	return (
		<span className={`${className}`} {...props}>
			{text}
		</span>
	);
};

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	text: string,
	className: string
}

export default Label;