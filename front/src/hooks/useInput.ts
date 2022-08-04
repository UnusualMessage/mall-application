import {ChangeEventHandler, useCallback, useState} from "react";

const useInput = (defaultValue: string) => {
	const [value, setValue] = useState(defaultValue);
	
	const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
		setValue(e.target.value);
	}, []);
	
	return {
		value: value,
		onChange: onChange
	};
};

export default useInput;