import { Col, Empty, PageHeader, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ItemCard from "./ItemCard";

import DiscountStore from "../../../stores/DiscountStore";
import ShopStore from "../../../stores/ShopStore";
import EventStore from "../../../stores/EventStore";
import ImageStore from "../../../stores/ImageStore";
import CategoryStore from "../../../stores/CategoryStore";

import { Shop } from "../../../api/interfaces/shop";
import { Category } from "../../../api/interfaces/category";
import { Image } from "../../../api/interfaces/image";
import { Discount } from "../../../api/interfaces/discount";
import { Event } from "../../../api/interfaces/event";

const cardBreakpoints = {
    xs: 12,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 6,
    xxl: 4,
};

export enum StoreType {
    category,
    shop,
    event,
    image,
    discount,
}

const Items = ({ storeType }: Props) => {
    const [isFetching, setIsFetching] = useState(true);
    const redirect = useNavigate();

    const store = useMemo(() => {
        switch (storeType) {
            case StoreType.category:
                return CategoryStore;
            case StoreType.image:
                return ImageStore;
            case StoreType.event:
                return EventStore;
            case StoreType.discount:
                return DiscountStore;
            case StoreType.shop:
                return ShopStore;
        }
    }, [storeType]);

    const items = store.get() as
        | Shop[]
        | Category[]
        | Event[]
        | Image[]
        | Discount[];

    useEffect(() => {
        const getItems = async () => {
            await store.getAsync("");
            setIsFetching(false);
        };

        void getItems();
    }, [storeType]);

    if (isFetching) {
        return null;
    }

    return (
        <>
            <PageHeader
                onBack={() => redirect("../")}
                title="Элементы"
                style={{ padding: 0, paddingBottom: 20 }}
            />

            {items.length === 0 ? (
                <Empty description={"Данные отсутствуют!"} />
            ) : (
                <Row gutter={[32, 32]} justify={"space-evenly"}>
                    {items.map((item) => {
                        if ("image" in item && "title" in item) {
                            return (
                                <Col {...cardBreakpoints} key={item.id}>
                                    <ItemCard
                                        title={item.title}
                                        to={item.id}
                                        image={item.image.path}
                                    />
                                </Col>
                            );
                        } else if ("title" in item) {
                            return (
                                <Col {...cardBreakpoints} key={item.id}>
                                    <ItemCard title={item.title} to={item.id} />
                                </Col>
                            );
                        } else {
                            return (
                                <Col {...cardBreakpoints} key={item.id}>
                                    <ItemCard image={item.path} />
                                </Col>
                            );
                        }
                    })}
                </Row>
            )}
        </>
    );
};

interface Props {
    storeType: StoreType;
}

export default observer(Items);
