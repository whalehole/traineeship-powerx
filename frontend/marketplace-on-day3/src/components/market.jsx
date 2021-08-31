import { classNames } from "../lib/classnames";
import { getMarket } from "../lib/market.calls";
import { useState, useEffect } from "react";
import MarketItem from "./market-item";

export default function Market({className, handleAddCart}) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1)

    useEffect(()=>{
        getMarket(page, 5).then(res=>setItems(res));
    }, [page])

    return (
        <div className={classNames("w-big-4", className)}>
            <p className="text-center text-4xl mb-20">MARKETPLACE</p>
            <div className="grid grid-cols-3 justify-items-center gap-x-12 gap-y-20">
                {items && items.map(item=>{
                    return (
                        <MarketItem 
                        item={item}
                        key={item._id} 
                        title={item.title} 
                        description={item.description} 
                        price={item.price} 
                        condition={item.condition}
                        imageUrl={item.imageUrl}
                        availability={item.availability}
                        numOfStock={item.numOfStock}
                        handleAddCart={handleAddCart}/>
                    )
                })}
            </div>
        </div>
    )
}