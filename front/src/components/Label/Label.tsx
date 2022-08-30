import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import classNames from "classnames";

const Label: FC<Props> = ({ text, className, ...props }: Props) => {
    return (
        <span className={classNames(className)} {...props}>
            {text}
        </span>
    );
};

interface Props
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    text: string;
    className: string;
}

export default Label;
