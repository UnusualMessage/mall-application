import classNames from "classnames";
import {
	AlignCenterOutlined,
	AlignLeftOutlined, AlignRightOutlined,
	BoldOutlined, DeleteOutlined, DownSquareOutlined, FileImageOutlined,
	ItalicOutlined, LinkOutlined, OrderedListOutlined, RedoOutlined,
	UnderlineOutlined, UndoOutlined, UnorderedListOutlined, UpSquareOutlined
} from "@ant-design/icons";

import css from "./toolbar.module.scss";

import {AlignButton, ClearButton, ElementButton, HistoryButton, ImageButton, LinkButton, TextButton} from "../buttons";

import {Action} from "../buttons/HistoryButton";
import {LinkButtonType} from "../buttons/LinkButton";
import {Divider} from "antd";

const Toolbar = () => {
	return (
		<div className={classNames(css.wrapper)}>
			<Divider type={"vertical"}/>
			<TextButton icon={<BoldOutlined />} format={"bold"}/>
			<TextButton icon={<ItalicOutlined />} format={"italic"}/>
			<TextButton icon={<UnderlineOutlined />} format={"underlined"}/>
			
			<Divider type={"vertical"}/>
			<AlignButton icon={<AlignLeftOutlined />} align={"left"}/>
			<AlignButton icon={<AlignCenterOutlined />} align={"center"}/>
			<AlignButton icon={<AlignRightOutlined />} align={"right"}/>
			
			<Divider type={"vertical"}/>
			<ElementButton icon={<OrderedListOutlined />} type={"ol-list"}/>
			<ElementButton icon={<UnorderedListOutlined />} type={"ul-list"}/>
			
			<Divider type={"vertical"}/>
			<ElementButton icon={<UpSquareOutlined />} type={"heading-one"}/>
			<ElementButton icon={<DownSquareOutlined />} type={"heading-two"}/>
			
			<Divider type={"vertical"}/>
			<ImageButton icon={<FileImageOutlined />} format={"image"}/>
			
			<Divider type={"vertical"}/>
			<LinkButton icon={<LinkOutlined />} action={LinkButtonType.add}/>
			<LinkButton icon={<LinkOutlined />} action={LinkButtonType.remove}/>
			
			<Divider type={"vertical"}/>
			<HistoryButton icon={<UndoOutlined />} action={Action.undo}/>
			<HistoryButton icon={<RedoOutlined />} action={Action.redo}/>
			<ClearButton icon={<DeleteOutlined />}/>
			<Divider type={"vertical"}/>
		</div>
	);
};

export default Toolbar;