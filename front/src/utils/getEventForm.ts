import Event from "../api/interfaces/event/Event";

interface InitialValue {
	type: string,
	value?: string
}

type Name = string;

type Returns = Record<Name, InitialValue>;

const getEventForm = (event?: Event): Returns => {
	return {
		title: {
			type: "text",
			value: event?.title
		},
		
		description: {
			type: "text",
			value: event?.description
		},
		
		shop: {
			type: "text",
			value: event?.shop.id
		},
	};
};

export default getEventForm;