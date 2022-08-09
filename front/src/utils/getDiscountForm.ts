import Discount from "../api/interfaces/discount/Discount";

interface InitialValue {
	type: string,
	value?: string
}

type Name = string;

type Returns = Record<Name, InitialValue>;

const getDiscountForm = (discount?: Discount): Returns => {
	return {
		title: {
			type: "text",
			value: discount?.title
		},
		
		description: {
			type: "text",
			value: discount?.description
		},
		
		shop: {
			type: "text",
			value: discount?.shop.id
		},
	};
};

export default getDiscountForm;