import { memo } from "react";

import Shop from "../../../../api/interfaces/shop/Shop";

import { Shop as ShopComponent } from "./index";

const Shops = ({ shops }: Props) => {
    return (
        <>
            {shops.map((shop) => {
                return <ShopComponent shop={shop} key={shop.id} />;
            })}
        </>
    );
};

interface Props {
    shops: Shop[];
}

export default memo(Shops);
