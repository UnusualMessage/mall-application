import classNames from "classnames";
import React, {ChangeEventHandler, memo, useCallback} from "react";

import labelStyles from "/src/components/Label/label.module.scss";
import css from "./input.module.scss";

const ImageInput = ({ label, placeholder, name, defaultValue, setImage }: Props) => {
	const handleImage: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
		if (e.target.files?.length) {
			const file = e.target.files[0];
			setImage(file);
		}
	}, [setImage]);
	
	return (
		<div className={classNames(css.wrapper)}>
			<label className={classNames(labelStyles.mini, labelStyles.bold, css.label)} htmlFor={name}>
				{label}
			</label>
			
			<input className={classNames(labelStyles.mini, labelStyles.bold, css.input)}
			       id={name}
			       name={name}
			       type={"file"}
			       placeholder={placeholder}
			       accept={"image/*"}
			       defaultValue={defaultValue ? defaultValue : ""}
			       onChange={handleImage}
			/>
		</div>
	);
};

interface Props {
	label: string,
	placeholder: string,
	defaultValue?: string,
	name: string
	setImage: React.Dispatch<React.SetStateAction<File | undefined>>
}

export default memo(ImageInput);