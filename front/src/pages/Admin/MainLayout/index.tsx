import React, {memo, ReactNode} from "react";
import {
	AppstoreOutlined,
	InfoCircleOutlined,
	PercentageOutlined,
	PictureOutlined,
	PlusOutlined,
	ScheduleOutlined,
	ShopOutlined, TagsOutlined,
} from "@ant-design/icons";
import {Layout, Menu} from "antd";
import { MenuProps } from "antd";
import {Outlet} from "react-router-dom";

import css from "./index.module.scss";

import {InnerLink} from "../../../components/Link";

const { Header, Content, Sider } = Layout;

interface Nav {
	label: ReactNode,
	key: string,
	icon: ReactNode,
	children?: Nav[]
}

const getNav = (label: ReactNode, key: string, icon: ReactNode, children?: Nav[]): Nav => {
	return {
		label: label,
		key: key,
		icon: icon,
		children: children
	};
};

const items: MenuProps["items"] = [
	getNav("Магазины", "shops", <ShopOutlined/>, [
		getNav(<InnerLink to={"shops"}> Просмотреть </InnerLink>, "all-shops", <AppstoreOutlined/>),
		getNav(<InnerLink to={"shops/new"}> Добавить </InnerLink>, "new-shop", <PlusOutlined/>)
	]),
	
	getNav("Акции и скидки", "discounts", <PercentageOutlined/>, [
		getNav(<InnerLink to={"discounts"}> Просмотреть </InnerLink>, "all-discounts", <AppstoreOutlined/>),
		getNav(<InnerLink to={"discounts/new"}> Добавить </InnerLink>, "new-discount", <PlusOutlined/>)
	]),
	
	getNav("Новости и события", "events", <ScheduleOutlined/>, [
		getNav(<InnerLink to={"events"}> Просмотреть </InnerLink>, "all-events", <AppstoreOutlined/>),
		getNav(<InnerLink to={"events/new"}> Добавить </InnerLink>, "new-event", <PlusOutlined/>)
	]),
	
	getNav("Категории", "categories", <TagsOutlined/>, [
		getNav(<InnerLink to={"categories"}> Просмотреть </InnerLink>, "all-categories", <AppstoreOutlined/>),
		getNav(<InnerLink to={"categories/new"}> Добавить </InnerLink>, "new-category", <PlusOutlined/>)
	]),
	
	getNav("Изображения", "images", <PictureOutlined/>, [
		getNav(<InnerLink to={"images"}> Просмотреть </InnerLink>, "all-images", <AppstoreOutlined/>),
		getNav(<InnerLink to={"images/new"}> Добавить </InnerLink>, "new-image", <PlusOutlined/>)
	]),
	
	getNav(<InnerLink to={"info"}> Контакты и информация </InnerLink>, "info", <InfoCircleOutlined/>),
];


const MainLayout = () => (
	<Layout hasSider>
		<Sider className={css.sider} width={240}>
			<Menu theme="dark" mode="inline" items={items}/>
		</Sider>
		<Layout className={css.main}>
			<Header className={css.header}>
				<Menu className={css.horizontalMenu} theme="dark" mode="horizontal" items={items}/>
			</Header>
			<Content className={css.content}>
				<Outlet/>
			</Content>
		</Layout>
	</Layout>
);

export default memo(MainLayout);