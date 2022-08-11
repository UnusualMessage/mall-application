import shops from "./shops";
import Discount from "../api/interfaces/discount/Discount";

import transliterate from "../utils/transliterate";

const discounts: Discount[] = [
	{
		id: "1",
		title: "Летний SALE в Tom Tailor: скидки до 50%",
		image: "/images/discounts/tt_300_365_jpg.jpg",
		description: "Летний SALE в Tom Tailor! Скидки до 50%! Количество товара ограничено. Подробности уточняйте у продавцов-консультантов отдела. Акция действительна до 31 июля 2022 г.",
		link: transliterate("Летний SALE в Tom Tailor: скидки до 50%"),
		routePath: `discounts/${transliterate("Летний SALE в Tom Tailor: скидки до 50%")}`,
		shop: shops[5]
	},
	
	{
		id: "2",
		title: "Летний SALE в Спортмастер: скидки до 50%",
		image: "/images/discounts/sm_300_365_jpg.jpg",
		description: "Летний SALE в Спортмастер! Скидки до 50%! Количество товара ограничено. Подробности уточняйте у продавцов-консультантов отдела. Акция действительна до 31 июля 2022 г.",
		link: transliterate("Летний SALE в Спортмастер: скидки до 50%"),
		routePath: `discounts/${transliterate("Летний SALE в Спортмастер: скидки до 50%")}`,
		shop: shops[4]
	},
	
	{
		id: "3",
		title: "Летний SALE в Спортмастер: скидки до 50%",
		image: "/images/discounts/sm_krosy_300_365_jpg.jpg",
		description: "Летний SALE в Спортмастер! Скидки до 50%! Количество товара ограничено. Подробности уточняйте у продавцов-консультантов отдела. Акция действительна до 31 июля 2022 г.",
		link: transliterate("Летний SALE в Спортмастер: скидки до 50%"),
		routePath: `discounts/${transliterate("Летний SALE в Спортмастер: скидки до 50%")}`,
		shop: shops[4]
	},
	
	{
		id: "4",
		title: "Скидки до 50% на всё для отдыха у воды в «Спортмастере»",
		image: "/images/discounts/sm_voda_300_365_jpg.jpg",
		description: "Летний SALE в Спортмастер! Скидки до 50%! Количество товара ограничено. Подробности уточняйте у продавцов-консультантов отдела. Акция действительна до 31 июля 2022 г.",
		link: transliterate("Скидки до 50% на всё для отдыха у воды в «Спортмастере»"),
		routePath: `discounts/${transliterate("Скидки до 50% на всё для отдыха у воды в «Спортмастере»")}`,
		shop: shops[4]
	},
];

export default discounts;