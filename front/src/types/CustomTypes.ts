import {BaseEditor, Node} from "slate";
import {ReactEditor} from "slate-react";
import {HistoryEditor} from "slate-history";

type Align = "center" | "left" | "right" | "justify";

interface CustomElement { type: string, align?: Align, children: Node[] }

interface CustomText {
	text: string,
	bold?: boolean,
	italic?: boolean,
	underlined?: boolean
}

declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor & HistoryEditor
		Element: CustomElement
		Text: CustomText | Record<string, boolean | string>
	}
}