import {Descendant} from "slate";
import {ReactEditor} from "slate-react";
import {HistoryEditor} from "slate-history";

export type Align = "center" | "left" | "right";
export type Level = 1 | 2 | 3 | 4 | 5;
export type TextFormat = "bold" | "italic" | "underlined";

export type ElementType = "paragraph" |
	"ol-list" |
	"ul-list" |
	"heading" |
	"list-item" |
	"link" |
	"image";

interface CustomElement {
	type: ElementType,
	align?: Align,
	children: Descendant[],
	url?: string,
	src?: string,
	level?: Level
}

interface CustomText {
	text: string,
	bold?: boolean,
	italic?: boolean,
	underlined?: boolean
}

declare module "slate" {
	interface CustomTypes {
		Editor: ReactEditor & HistoryEditor
		Element: CustomElement
		Text: CustomText
	}
}