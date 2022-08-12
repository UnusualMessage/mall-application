import classNames from "classnames";

import css from "./toolbar.module.scss";

import TextButton from "./TextButton";
import ElementButton from "./ElementButton";

import icons from "../../../data/icons";
import ClearButton from "./ClearButton";
import HistoryButton, {Action} from "./HistoryButton";
import AlignButton from "./AlignButton";
import LinkButton, {LinkButtonType} from "./LinkButton";

const Toolbar = () => {
	return (
		<div className={classNames(css.wrapper)}>
			<TextButton icon={icons.bold} format={"bold"}/>
			<TextButton icon={icons.italic} format={"italic"}/>
			<TextButton icon={icons.underlined} format={"underlined"}/>
			
			<AlignButton icon={icons.left} align={"left"}/>
			<AlignButton icon={icons.center} align={"center"}/>
			<AlignButton icon={icons.right} align={"right"}/>
			
			<ElementButton icon={icons.ol} type={"ol-list"}/>
			<ElementButton icon={icons.ul} type={"ul-list"}/>
			<ElementButton icon={icons.headingOne} type={"heading-one"}/>
			<ElementButton icon={icons.headingTwo} type={"heading-two"}/>
			
			<LinkButton icon={icons.addLink} action={LinkButtonType.add}/>
			<LinkButton icon={icons.removeLink} action={LinkButtonType.remove}/>
			
			<HistoryButton icon={icons.undo} action={Action.undo}/>
			<HistoryButton icon={icons.redo} action={Action.redo}/>
			<ClearButton icon={icons.clear}/>
		</div>
	);
};

export default Toolbar;