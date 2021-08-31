import { useState, useEffect } from 'react';
import LoginPage from './login-page';
import { useAuth } from '../lib/auth.state';
import ShoppingCart from '../components/shopping-cart';
import Market from '../components/market';

export default function Marketplace() {
    const [cart, setCart] = useState([]);

    const handleAddCart = (item) => {
        const isItem = i => i._id === item._id
        const index = cart.findIndex(isItem);
        if (index !== -1) {
            const updatedCart = JSON.parse(JSON.stringify(cart));
            updatedCart[index]["count"] +=1;
            updatedCart[index]["combinedPrice"] += item.price;
            setCart(updatedCart);
        }
        else {
            item["count"] = 1;
            item["combinedPrice"] = item.price;
            setCart(cart.concat(item))
        }
    }
    const handleDelCart = (key) => {
        const result = cart.filter(item=>item._id!==key);
        setCart(result);
    }
    // if (useAuth().status === "guest") {return <LoginPage />}

    return useAuth().status !== "authenticated" ? 
    <LoginPage /> 
    :
    <div className="min-w-big-1">
        <Market className="float-left" handleAddCart={handleAddCart}/>
        <ShoppingCart className="float-right" cart={cart} handleDelCart={handleDelCart}/>
    </div>

    // return (
    //     <div className="min-w-big-1">
            // <Market className="float-left" handleAddCart={handleAddCart}/>
            // <ShoppingCart className="float-right" cart={cart} handleDelCart={handleDelCart}/>
    //     </div>
    // )
}