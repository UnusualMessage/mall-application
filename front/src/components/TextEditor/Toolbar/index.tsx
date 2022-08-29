import classNames from "classnames";
import {
	AlignCenterOutlined,
	AlignLeftOutlined, AlignRightOutlined,
	BoldOutlined, DeleteOutlined, DisconnectOutlined, FileImageOutlined,
	ItalicOutlined, LinkOutlined, OrderedListOutlined, RedoOutlined,
	UnderlineOutlined, UndoOutlined, UnorderedListOutlined
} from "@ant-design/icons";
import {Divider, Space} from "antd";

import css from "./index.module.scss";

import {AlignButton, ClearButton, ElementButton, HistoryButton, ImageButton, LinkButton, TextButton} from "../buttons";

import {Action} from "../buttons/HistoryButton";
import {LinkButtonType} from "../buttons/LinkButton";
import HeadingSelect from "../buttons/HeadingSelect";

const Toolbar = () => {
	return (
		<Space className={classNames(css.wrapper)} wrap>
			<Divider type={"vertical"}/>
			<Space size={"large"}>
				<TextButton icon={<BoldOutlined />} format={"bold"}/>
				<TextButton icon={<ItalicOutlined />} format={"italic"}/>
				<TextButton icon={<UnderlineOutlined />} format={"underlined"}/>
			</Space>
			
			<Divider type={"vertical"}/>
			<Space size={"large"}>
				<AlignButton icon={<AlignLeftOutlined />} align={"left"}/>
				<AlignButton icon={<AlignCenterOutlined />} align={"center"}/>
				<AlignButton icon={<AlignRightOutlined />} align={"right"}/>
			</Space>
			
			
			<Divider type={"vertical"}/>
			<Space size={"large"}>
				<ElementButton icon={<OrderedListOutlined />} type={"ol-list"}/>
				<ElementButton icon={<UnorderedListOutlined />} type={"ul-list"}/>
			</Space>
			
			<Divider type={"vertical"}/>
			<HeadingSelect/>
			
			<Divider type={"vertical"}/>
			<ImageButton icon={<FileImageOutlined />} format={"image"}/>
			
			<Divider type={"vertical"}/>
			<Space size={"large"}>
				<LinkButton icon={<LinkOutlined />} action={LinkButtonType.add}/>
				<LinkButton icon={<DisconnectOutlined />} action={LinkButtonType.remove}/>
			</Space>
			
			<Divider type={"vertical"}/>
			<Space size={"large"}>
				<HistoryButton icon={<UndoOutlined />} action={Action.undo}/>
				<HistoryButton icon={<RedoOutlined />} action={Action.redo}/>
				<ClearButton icon={<DeleteOutlined />}/>
			</Space>
			<Divider type={"vertical"}/>
		</Space>
	);
};

export default Toolbar;