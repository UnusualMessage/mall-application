import Cell from "../api/interfaces/cell/Cell";

const map: Cell[] = [
	{
		id: "1",
		path:
			<>
				<g>
					<polygon fill="#FF7800" points="90,10 90,100 80,100 20,100 20,450 360,450 360,10 		"/>
					<polygon fill="#E66100" points="20,100 10,110 10,460 350,460 360,450 20,450 		"/>
					<polygon fill="#E66100" points="90,10 80,20 80,100 90,100 		"/>
				</g>
				<text transform="matrix(1 0 0 1 105 246)" fontSize="30.3447px" fill="#393939" fontFamily="ArialMT">ПЯТЕРОЧКА</text>
			</>,
		floor: 1
	},
	
	{
		id: "2",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M510,190v90H375v-90H510z"/>
					<path fill="#E66100" d="M375,280l-10,10v-90l10-10V280z M365,290h135l10-10H375L365,290z"/>
				</g>
				<text transform="matrix(1 0 0 1 400 246)" fontSize="20.492px" fill="#393939" fontFamily="ArialMT">АПТЕКА</text>
			</>,
		floor: 1
	},
	
	{
		id: "3",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M510,295v70H375v-70H510z"/>
					<path fill="#E66100" d="M375,365h135l-10,10H365v-70l10-10V365z"/>
				</g>
				<text transform="matrix(1 0 0 1 390.0001 341.0002)" fontSize="20.492px" fill="#393939" fontFamily="ArialMT">ВАРНИЦА</text>
			</>,
		floor: 1
	},
	
	{
		id: "4",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M510,380v70H375v-70H510z"/>
					<path fill="#E66100" d="M375,450h135l-10,10H365v-70l10-10V450z"/>
				</g>
				<text transform="matrix(1 0 0 1 405 426)" fontSize="20.492px" fill="#393939" fontFamily="ArialMT">MATRIX</text>
			</>,
		floor: 1
	},
	
	{
		id: "5",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M645,10v125H525V10H645z"/>
					<path fill="#E66100" d="M525,135h120l-10,10H515l0,0V20l10-10V135L525,135z"/>
				</g>
				<text transform="matrix(1 0 0 1 535.0001 81)" fontSize="20.492px" fill="#393939" fontFamily="ArialMT">УЮТЕРРА</text>
			</>,
		floor: 1
	},
	
	{
		id: "6",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M730,10v125h-70V10H730z"/>
					<path fill="#E66100" d="M660,135h70l-10,10h-70l0,0V20l10-10V135L660,135z"/>
				</g>
				<text transform="matrix(1 0 0 1 662 78)" fontSize="14.8668px" fill="#393939" fontFamily="ArialMT">МЕБЕЛЬ</text>
			</>,
		floor: 1
	},
	
	{
		id: "7",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M815,10v125h-70V10H815z"/>
					<path fill="#E66100" d="M745,135h70l-10,10h-70V20l10-10V135z"/>
				</g>
				<rect x="742" y="59.8" fill="none" width="75" height="30.2"/>
				<text transform="matrix(1.0031 0 0 1 747.3564 70.959)"><tspan x="0" y="0" fontSize="13px" fill="#393939" fontFamily="ArialMT">КУРИНЫЙ </tspan><tspan x="17.2" y="15.6" fontSize="13px" fill="#393939" fontFamily="ArialMT">ДОМ</tspan></text>
			</>,
		floor: 1
	},
	
	{
		id: "8",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M980,100v35H860v-35H980z"/>
					<path fill="#E66100" d="M860,135h120l-10,10H850v-35l10-10V135z"/>
				</g>
				<text transform="matrix(1 0 0 1 864 123)" fontSize="13.5665px" fill="#393939" fontFamily="ArialMT">УЗБЕКСКИЙ РАЙ</text>
			</>,
		floor: 1
	},
	
	{
		id: "9",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M980,150v60h-80v-60H980z"/>
					<path fill="#E66100" d="M900,210h80l-10,10h-80v-60l10-10V210z"/>
				</g>
				<text transform="matrix(1 0 0 1 907 186)" fontSize="14.8668px" fill="#393939" fontFamily="ArialMT">МИЛЕДИ</text>
			</>,
		floor: 1
	},
	
	{
		id: "10",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M980,225v55h-80v-55H980z"/>
					<path fill="#E66100" d="M900,280h80l-10,10h-80v-55l10-10V280z"/>
				</g>
				<text transform="matrix(1 0 0 1 905 258.6353)" fontSize="17.7361px" fill="#393939" fontFamily="ArialMT">КАПРИЗ</text>
			</>,
		floor: 1
	},
	
	{
		id: "11",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M980,295v100h-80v-40h40h10v-60H980z"/>
					<path fill="#E66100" d="M900,395h80l-10,10h-80v-40l10-10V395z M950,295l-10,10v50h10V295z"/>
				</g>
				<text transform="matrix(1 0 0 1 902 381)" fontSize="13.1216px" fill="#393939" fontFamily="ArialMT">ОК ОПТИКА</text>
			</>,
		floor: 1
	},
	
	{
		id: "12",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M810,470v90H710v-90H810z"/>
					<path fill="#E66100" d="M710,560h100l-10,10H700v-90l10-10V560z"/>
				</g>
				<rect x="709.3" y="497.7" fill="none" width="99.9" height="34.1"/>
				<text transform="matrix(1 0 0 1 712.9071 509.0533)"><tspan x="0" y="0" fontSize="13.268px" fill="#393939" fontFamily="ArialMT">КАНЦТОВАРЫ </tspan><tspan x="14.6" y="18" fontSize="13.268px" fill="#393939" fontFamily="ArialMT">ИГРУШКИ</tspan></text>
			</>,
		floor: 1
	},
	
	{
		id: "13",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M695,470v90H595v-90H695z"/>
					<path fill="#E66100" d="M595,560h100l-10,10H585v-90l10-10V560z"/>
				</g>
				<rect x="598" y="503.8" fill="none" width="92.7" height="23.9"/>
				<text transform="matrix(1 0 0 1 599.4979 512.4405)"><tspan x="0" y="0" fontSize="10.0733px" fill="#393939" fontFamily="ArialMT">БРИЛЛИАНТОВАЯ </tspan><tspan x="32" y="12" fontSize="10.0733px" fill="#393939" fontFamily="ArialMT">РУКА</tspan></text>
			</>,
		floor: 1
	},
	
	{
		id: "14",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M625,190v45h-60v-45H625z"/>
					<path fill="#E66100" d="M565,235h60l-10,10h-60v-45l10-10V235z"/>
				</g>
				<rect x="566.4" y="204.6" fill="none" width="58" height="22.8"/>
				<text transform="matrix(1 0 0 1 566 212.1575)"><tspan x="0" y="0" fontSize="8.5271px" fill="#393939" fontFamily="ArialMT">ЗООТОВАРЫ </tspan><tspan x="0" y="11" fontSize="8.5271px" fill="#393939" fontFamily="ArialMT">ГАЛАНТЕРЕЯ</tspan></text>
			</>,
		floor: 1
	},
	
	{
		id: "15",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M700,190v45h-60v-45H700z"/>
					<path fill="#E66100" d="M640,235h60l-10,10h-60v-45l10-10V235z"/>
				</g>
				<rect x="633.5" y="203.2" fill="none" width="73.8" height="23.3"/>
				<text transform="matrix(1 0 0 1 642 210.8159)"><tspan x="0" y="0" fontSize="8.8931px" fill="#393939" fontFamily="ArialMT">ДОМАШНИЙ </tspan><tspan x="3.6" y="11" fontSize="8.8931px" fill="#393939" fontFamily="ArialMT">ТЕКСТИЛЬ</tspan></text>
			</>,
		floor: 1
	},
	
	{
		id: "16",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M775,190v45h-60v-45H775z"/>
					<path fill="#E66100" d="M715,235h60l-10,10h-60v-45l10-10V235z"/>
				</g>
				<text transform="matrix(1 0 0 1 720 218.8806)" fontSize="14.4549px" fill="#393939" fontFamily="ArialMT">DANDY</text>
			</>,
		floor: 1
	},
	
	{
		id: "17",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M850,190v45h-60v-45H850z"/>
					<path fill="#E66100" d="M790,235h60l-10,10h-60v-45l10-10V235z"/>
				</g>
				<text transform="matrix(1 0 0 1 792 219.1105)" fontSize="13.2843px" fill="#393939" fontFamily="ArialMT">МЕБЕЛЬ</text>
			</>,
		floor: 1
	},
	
	{
		id: "18",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M850,250v45h-60v-45H850z"/>
					<path fill="#E66100" d="M790,295h60l-10,10h-60v-45l10-10V295z"/>
				</g>
				<text transform="matrix(1 0 0 1 792 277.0808)" fontSize="11.2173px" fill="#393939" fontFamily="ArialMT">МЕГАФОН</text>
			</>,
		floor: 1
	},
	
	{
		id: "19",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M775,250v45h-60v-45H775z"/>
					<path fill="#E66100" d="M715,295h60l-10,10h-60v-45l10-10V295z"/>
				</g>
				<text transform="matrix(1 0 0 1 716 276)" fontSize="9.1197px" fill="#393939" fontFamily="ArialMT">СИМВОЛ.РФ</text>
			</>,
		floor: 1
	},
	
	{
		id: "20",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M700,250v45h-60v-45H700z"/>
					<path fill="#E66100" d="M640,295h60l-10,10h-60v-45l10-10V295z"/>
				</g>
				<text transform="matrix(1 0 0 1 647.251 279.9765)" fontSize="20.492px" fill="#393939" fontFamily="ArialMT">МТС</text>
			</>,
		floor: 1
	},
	
	{
		id: "21",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M625,250v45h-60v-45H625z"/>
					<path fill="#E66100" d="M565,295h60l-10,10h-60v-45l10-10V295z"/>
				</g>
				<text transform="matrix(1 0 0 1 569.0004 278.0002)" fontSize="11.2172px" fill="#393939" fontFamily="ArialMT">ЗОО МИР</text>
			</>,
		floor: 1
	},
	
	{
		id: "22",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M670,345v50h-75v-50H670z"/>
					<path fill="#E66100" d="M595,395h75l-10,10h-75v-50l10-10V395z"/>
				</g>
				<rect x="596.7" y="358.2" fill="none" width="73.3" height="27.8"/>
				<text transform="matrix(1 0 0 1 597 367.2489)"><tspan x="0" y="0" fontSize="10.5695px" fill="#393939" fontFamily="ArialMT">ВОСТОЧНЫЕ </tspan><tspan x="5" y="11" fontSize="10.5695px" fill="#393939" fontFamily="ArialMT">СЛАДОСТИ</tspan></text>
			</>,
		floor: 1
	},
	
	{
		id: "23",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M510,450H20V290h490V450z"/>
					<path fill="#E66100" d="M10,300l10-10l0,160l-10,10L10,300z M10,460h490l10-10H20L10,460z"/>
				</g>
				<text transform="matrix(1 0 0 1 210 380.7617)" fill="#393939" fontFamily='ArialMT' fontSize="31.5322px">ЭЛЕКС</text>
			</>,
		floor: 2
	},
	
	{
		id: "24",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M850,371v99H700v106h99.8C906,576,992,490,992,383.8V371H850z"/>
					<path fill="#E66100" d="M840,381l10-10l0,99l-10,10V381z"/>
					<path fill="#FF7800" d="M850,480h-11v-10h11V480z"/>
					<path fill="#E66100" d="M690,480l10-10l0,106l-10,10L690,480z"/>
				</g>
				<text transform="matrix(1 0 0 1 815.0372 520.8243)" fill="#393939" fontFamily='ArialMT' fontSize="31.5322px">DNS</text>
			</>,
		floor: 2
	},
	
	{
		id: "25",
		path:
			<>
				<g>
					<path fill="#E66100" d="M665,285H10l10-10h655L665,285z M10,165l10-10l0-55l-10,10L10,165z M10,285l10-10v-65l-10,10V285z M150,155
			H20l-10,10h130L150,155z M140,210h10v-55h-10V210z"/>
					<path fill="#FF7800" d="M800,75H470V10h330V75z M675,75H470v25h205V75z M20,100v55h130v55H20v65h655V100H20z"/>
					<path fill="#E66100" d="M460,20l10-10l0,90l-10,10L460,20z M800,75H675l-10,10h125L800,75z"/>
					<path fill="#FF7800" d="M470,100h-10v10h10V100z M675,85h-10V75h10V85z"/>
				</g>
				<text transform="matrix(1 0 0 1 339.6118 200.9834)" fill="#393939" fontFamily='ArialMT' fontSize="36.9147px">ХОРОШИЙ</text>
			</>,
		floor: 2
	},
	
	{
		id: "26",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M690,91h110v185H690V91z"/>
					<path fill="#E66100" d="M790,286H680l10-10h110L790,286z M680,101l10-10l0,185l-10,10L680,101z"/>
				</g>
				<text transform="matrix(1 0 0 1 714.5898 201.4863)" fill="#393939" fontFamily='ArialMT' fontSize="24.7146px">KARI</text>
			</>,
		floor: 2
	},
	
	{
		id: "27",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M850,156h135v200H850V156z"/>
					<path fill="#E66100" d="M840,166l10-10v200l-10,10V166z M840,366h135l10-10H850L840,366z"/>
				</g>
				<text transform="matrix(1 0 0 1 859.6113 270.5215)" fill="#393939" fontFamily='ArialMT' fontSize="25.1774px">FIXPRICE</text>
			</>,
		floor: 2
	},
	
	{
		id: "28",
		path:
			<>
				<g>
					<path fill="#FF7800" d="M685,561h-90v-91h90V561z"/>
					<path fill="#E66100" d="M585,480l10-10v91l-10,10V480z M585,571h90l10-10h-90L585,571z"/>
				</g>
				<rect x="598" y="507.4" fill="none" width="85.5" height="28.6"/>
				<text transform="matrix(1 0 0 1 599.8887 515.1011)"><tspan x="0" y="0" fill="#393939" fontFamily='ArialMT' fontSize="9px">КОСМЕТИЧЕСКИЙ </tspan><tspan x="24.5" y="10.8" fill="#393939" fontFamily='ArialMT' fontSize="9px">САЛОН</tspan></text>
			</>,
		floor: 2
	},
	
];

export default map;