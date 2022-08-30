import React from "react";
import classNames from "classnames";
import { RenderElementProps } from "slate-react";
import { Image, Typography } from "antd";

import label from "/src/components/Label/label.module.scss";
import link from "/src/components/Link/link.module.scss";

import { OuterLink } from "../../Link";

const { Title, Paragraph } = Typography;

const Element = ({ children, element, attributes }: RenderElementProps) => {
    const align = element.align;
    const level = element.level;

    let classes = classNames();
    if (align) {
        classes = classNames(label[align]);
    }

    switch (element.type) {
        case "ul-list":
            return (
                <ul className={classNames(classes)} {...attributes}>
                    {children}
                </ul>
            );
        case "ol-list":
            return (
                <ol className={classNames(classes)} {...attributes}>
                    {children}
                </ol>
            );
        case "list-item":
            return (
                <li className={classNames(classes)} {...attributes}>
                    {children}
                </li>
            );
        case "heading":
            return (
                <Title
                    className={classNames(classes)}
                    level={level ?? 1}
                    {...attributes}
                >
                    {children}
                </Title>
            );
        case "image":
            return (
                <>
                    <Image src={element.src} preview={false} {...attributes} />
                    {children}
                </>
            );
        case "link":
            return (
                <OuterLink
                    className={classNames(classes, link.underlined)}
                    to={element.url ?? ""}
                    {...attributes}
                >
                    {children}
                </OuterLink>
            );
        default:
            return (
                <Paragraph className={classNames(classes)} {...attributes}>
                    {children}
                </Paragraph>
            );
    }
};

export default Element;
