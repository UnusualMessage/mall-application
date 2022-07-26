import Event from "../api/interfaces/event/Event";
import transliterate from "../utils/transliterate";

const events: Event[] = [
	{
		id: "1",
		title: "Летний SALE в ТРЦ «Макси» начался!",
		description: "Срочные новости! В торгово-развлекательном центре «Макси» небывалый летний SALE! Скидки до 80% в любимых магазинах!",
		image: "/images/events/glavnyj-imidzh-840h500-mm_840_500_jpg_2_100.jpg",
		link: transliterate("Летний SALE в ТРЦ «Макси» начался!"),
		route: `events/${transliterate("Летний SALE в ТРЦ «Макси» начался!")}`,
	},
	
	{
		id: "2",
		title: "Опрос для посетителей ТРЦ «Макси»",
		description: "Дорогие друзья! Пройдите опрос ТРЦ «Макси» для повышения уровня сервиса. Мы будем рады узнать ваше искреннее мнение как о самом ТРЦ «Макси», так и о рекламе нашего ТРЦ. Начните прохождение опроса по ссылке:",
		image: "/images/events/anons-840h500-rh_tula_840_500_jpg_2_100.jpg",
		link: transliterate("Опрос для посетителей ТРЦ «Макси»"),
		route: `events/${transliterate("Опрос для посетителей ТРЦ «Макси»")}`,
	},
	
	{
		id: "3",
		title: "Отдел женской одежды LIME открылся в ТРЦ «Макси»",
		description: "В ТРЦ «Макси» в Туле открылся отдел женской одежды LIME! LIMÉ создает коллекции, которые отличает не только актуальный дизайн, но и внимание к материалам и комфортному крою. Сезонные коллекции бренда разделены на тематические капсулы, постоянно сменяющие друг друга. У каждой капсулы — своя история, в которой каждая современная девушка может найти то, что подходит лично ей и отражает ее индивидуальность. Отдел находится на 1-м этаже. Добро пожаловать!",
		image: "/images/events/lajm_840h500-rh_840_500_jpg_2_100.jpg",
		link: transliterate("Отдел женской одежды LIME открылся в ТРЦ «Макси»"),
		route: `events/${transliterate("Отдел женской одежды LIME открылся в ТРЦ «Макси»")}`,
	},
	
	{
		id: "4",
		title: "Выгодное лето в OBI: скидки до 30%",
		description: "Скидки до 30% в магазине OBI! Выгодное лето в OBI! Отличные скидки на товары для дачи и сада из нового каталога! Смотрите лучшие предложения в ТРЦ «Макси»:",
		image: "/images/events/glavnyj-imidzh-840h500-mm_840_500_jpg_2_100 (1).jpg",
		link: transliterate("Выгодное лето в OBI: скидки до 30%"),
		route: `events/${transliterate("Выгодное лето в OBI: скидки до 30%")}`,
	},
	
	{
		id: "5",
		title: "Подарочные карты «Синема Парк»",
		description: "Не знаете, что подарить любимому человеку? Дарите эмоции! Дарите кино! Отличный подарок, который порадует любого! Купить подарочную карту можно в кассе или на сайте кинотеатра. Подробности — у сотрудников «Синема Парк».",
		image: "/images/events/840h5001_840_500_jpg_2_100.jpg",
		link: transliterate("Подарочные карты «Синема Парк»"),
		route: `events/${transliterate("Подарочные карты «Синема Парк»")}`,
	},
	
	{
		id: "6",
		title: "В «Синема Парк» по «Пушкинской карте»",
		description: "Что такое «Пушкинская карта»? Это банковская карта для граждан РФ от 14 до 22 лет, по которой можно посещать культурные мероприятия за счёт государства. На билеты в кино можно будет потратить две тысячи рублей!",
		image: "/images/events/840h500_840_500_jpg_2_100.jpg",
		link: transliterate("В «Синема Парк» по «Пушкинской карте»"),
		route: `events/${transliterate("В «Синема Парк» по «Пушкинской карте»")}`,
	},
];

export default events;