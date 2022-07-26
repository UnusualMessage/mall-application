const toRightForm = (count: number, text_forms: string[]) => {
	count = Math.abs(count) % 100;
	const n1 = count % 10;
	if (count > 10 && count < 20) { return text_forms[2]; }
	if (n1 > 1 && n1 < 5) { return text_forms[1]; }
	if (n1 == 1) { return text_forms[0]; }
	return text_forms[2];
};

export default toRightForm;