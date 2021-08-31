import { useEffect, useState } from "react";
import { classNames } from "../lib/classnames";
import CartItem from "./cart-item";


export default function ShoppingCart({className, cart, handleDelCart}) {
    console.log(cart)
    const totalPrice = () => {
        if (cart.length == 0) {
            return 0
        }
        const priceReducer = (totalPrice, currentItem) => totalPrice + currentItem.combinedPrice
        return cart.reduce(priceReducer, 0);
    }
    
    return (
        <div className={classNames("md:w-96", className)}>
            <div className="bg-red-400 p-6 mb-7">
                <p className="text-white text-2xl font-medium block">Your shopping cart</p>
                <p className="text-gray-200 font-thin block">Listing added into your shopping cart</p>
            </div>
            <div>
                {
                cart && cart.length>0 ? cart.map(item=>{
                    return (
                        <CartItem key={item._id} item={item} handleDelCart={handleDelCart}/>
                    )
                })
                :
                <p className="font-light mb-14">Pls add something to your cart :)</p>
                }
            </div>
            <div>
                <p>Total price: $ {cart===undefined? 0 : totalPrice()}</p>
            </div>
        </div>
    )
}