import Shop from "../api/interfaces/shop/Shop";
import categories from "./categories";

const baseCategory = categories[0];

const shops: Shop[] = [
	{
		id: "1",
		title: "befree",
		image: "/images/shops/befree.jpg",
		link: "befree",
		route: "shops/befree",
		schedule: "с 8:00 до 23:00",
		phone: "8 800 200-95-55",
		floor: "1",
		site: "befree.ru",
		categories: [baseCategory, categories[3]],
		description: "befree — это не просто бренд, это бэнд! Мы создаем одежду для таких же, как мы — друзей, мечтателей и искателей приключений. Для тех, кто хочет объехать весь мир с широко открытыми глазами и сердцем. Для одержимых модников и для тех, кто не любит выделяться. Для тех, кто одинок, и для тех, кто влюблен. Для дерзких и смелых, для робких и серьезных, для тусовщиков и пати-мейкеров, для ботаников и студентов-отличников.\n" +
			"\n" +
			"Магазин befree в Туле ждет вас за покупками на 1 этаже ТРЦ «Макси», ежедневно с 10:00 до 21:00."
	},
	
	{
		id: "2",
		title: "Детский мир",
		image: "/images/shops/detskij_mir.jpg",
		link: "detskij_mir",
		route: "shops/detskij_mir",
		schedule: "с 8:00 до 23:00",
		phone: "8 800 200-95-55",
		floor: "1",
		site: "www.detmir.ru",
		categories: [baseCategory, categories[1]],
		description: "Здесь вы найдете тысячи товаров для счастливого детства: игры и игрушки на любой вкус, товары для ухода и гигиены, детское питание, спортивные товары, изделия для отдыха, прогулок и путешествий, а также одежду и обувь для младенцев, малышей и школьников.\n" +
			"\n" +
			"Где найти подарок ребенку? Конечно же, в «Детском Мире» в ТРЦ «Макси» Тула. Здесь есть всё для мальчишек и девчонок с первых дней жизни: от подгузников до конструкторов, от колготок до музыкальных инструментов, от детских пюре до игровых TV-приставок. Подготовить чадо к детскому саду и школе? Собрать сына в школьный поход, а дочь — на танцы? Всё, что нужно купить, уже ждет вас в отделе «Детского Мира» в «Макси».\n" +
			"\n" +
			"Среди преимуществ «Детского Мира» в г. Тула — более 900 брендов разной направленности. Работает система бонусных карт, действуют подарочные сертификаты и возможность покупки товаров в рассрочку. Каждый месяц в магазине проходят тематические и сезонные распродажи, действуют скидки на товары недели."
	},
	
	{
		id: "3",
		title: "OBI",
		image: "/images/shops/obi.jpg",
		link: "obi",
		route: "shops/obi",
		schedule: "с 8:00 до 23:00",
		phone: "8 800 200-95-55",
		floor: "1",
		site: "www.obi.ru",
		categories: [baseCategory, categories[7]],
		description: "Компания ОБИ, основанная в 1970 году, — это более 650 гипермаркетов для ремонта и дачи, расположенных в 11 странах Центральной и Восточной Европы. Общее число сотрудников превышает 46 000 человек.\n" +
			"\n" +
			"В Россию компания ОБИ пришла в 2003 году и стала первой западной розничной сетью DIY в стране. На данный момент в России работают 27 гипермаркетов ОБИ: 8 — в Москве, 5 — в Санкт-Петербурге, по 2 магазина — в Нижнем Новгороде и Екатеринбурге и по одному — в Казани, Омске, Волгограде, Краснодаре, Саратове, Рязани, Сургуте, Брянске, Туле и Волжском.\n" +
			"\n" +
			"В просторных торговых залах гипермаркетов ОБИ можно найти 45 000 наименований товаров для ремонта, отделки и обустройства дома, дачи и загородного участка, а также садоводства и ландшафтного дизайна."
	},
	
	{
		id: "4",
		title: "Перекресток",
		image: "/images/shops/perekrestok.jpg",
		link: "perekrestok",
		route: "shops/perekrestok",
		schedule: "с 8:00 до 23:00",
		phone: "8 800 200-95-55",
		floor: "1",
		site: "www.perekrestok.ru",
		categories: [baseCategory, categories[6]],
		description: "«Перекрёсток» — федеральная розничная торговая сеть, одна из первых сетей городских супермаркетов. Супермаркет «Перекрёсток» в новой концепции — уже в тульском ТРЦ «Макси»!\n" +
			"\n" +
			"Ассортимент магазина включает в себя более 8000 наименований. Это не только товары повседневного спроса, но и деликатесы со всех концов света. «Перекрёсток» превращает привычный поход в магазин в увлекательное гастрономическое путешествие: на его полках всегда только свежий хлеб и выпечка из пекарни супермаркета, свежие мясо, птица и рыба, фрукты и овощи, готовая кулинария собственного производства, вина на любой вкус.\n" +
			"\n" +
			"Ассортимент супермаркетов регулярно обновляется на основе результатов анализа предпочтений покупателей, а качество предложенных товаров контролируется на всех этапах на пути от поставщика до покупателя.\n" +
			"\n" +
			"«Перекрёсток» — главный магазин вашего района!\n" +
			"Режим работы: с 8:00 до 23:00."
	},
	
	{
		id: "5",
		title: "Спортмастер",
		image: "/images/shops/novyj_logo_sportmaster.jpg",
		link: "sportsmaster",
		route: "shops/sportsmaster",
		schedule: "с 8:00 до 23:00",
		phone: "8 800 200-95-55",
		floor: "1",
		site: "www.sportmaster.ru",
		categories: [baseCategory, categories[10]],
		description: "Сеть спортивных магазинов для всей семьи «СПОРТМАСТЕР» — это лучшие предложения товаров для спорта и активного отдыха, которые помогут Вам сделать время, проведенное со своей семьей и друзьями, радостным и незабываемым.\n" +
			"\n" +
			"В сети «СПОРТМАСТЕР» представлен широкий ассортимент товаров для спорта и активного отдыха известных мировых марок таких как\n" +
			"\n" +
			"Nike,\n" +
			"Fila,\n" +
			"Kappa,\n" +
			"Demix,\n" +
			"Columbia,\n" +
			"Outventure,\n" +
			"Torneo,\n" +
			"Merrell,\n" +
			"Caterpillar,\n" +
			"Joss,\n" +
			"Glissade,\n" +
			"Termit,\n" +
			"Stern,\n" +
			"Trek,\n" +
			"Volkl,\n" +
			"Fischer,\n" +
			"Nordway,\n" +
			"O’Neil,\n" +
			"Roces,\n" +
			"Reaction,\n" +
			"Molten и многие другие.\n" +
			"«Спортмастер». С удовольствием вместе!"
	},
	
	{
		id: "6",
		title: "Tom Tailor",
		image: "/images/shops/tom_tailor.jpg",
		link: "tom_tailor",
		route: "shops/tom_tailor",
		schedule: "с 8:00 до 23:00",
		phone: "8 800 200-95-55",
		floor: "1",
		site: "tom-tailor-online.ru",
		categories: [baseCategory, categories[3]],
		description: "TOM TAILOR («Том Тейлор») — немецкая марка современной городской одежды для всей семьи. Бренд, созданный в Гамбурге, предлагает не просто европейский дресс-код, а глубоко укоренившийся образ демократического и рационального мышления.\n" +
			"\n" +
			"Главная особенность одежды из каталога TOM TAILOR — высокое качество, удобство, современный и выдержанный стиль с 1962 года. Но концепция Уве Шредера о современном образе и продукции высокого качества ведет нас по сей день.\n" +
			"\n" +
			"Сегодня единственный магазин «Том Тейлор» в Туле приглашает посетителей в ТРЦ «Макси». Здесь вы найдете самые актуальные модные тренды с оптимальным сочетанием цены и качества."
	},
];

export default shops;