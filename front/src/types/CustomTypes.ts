import {Descendant} from "slate";
import {ReactEditor} from "slate-react";
import {HistoryEditor} from "slate-history";

type Align = "center" | "left" | "right";
type Type = "paragraph" | "ol-list" | "ul-list" | "heading-one" | "heading-two";

interface CustomElement {
	type: Type,
	align?: Align,
	children: Descendant[]
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