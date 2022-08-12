import {Descendant} from "slate";
import {ReactEditor} from "slate-react";
import {HistoryEditor} from "slate-history";

export type Align = "center" | "left" | "right";
export type ElementType = "paragraph" | "ol-list" | "ul-list" | "heading-one" | "heading-two" | "list-item" | "link";

interface CustomElement {
	type: ElementType,
	align?: Align,
	children: Descendant[],
	url?: string
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