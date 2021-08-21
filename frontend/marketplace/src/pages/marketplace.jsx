import { useState, useEffect } from "react";
// import { getProducts } from "../lib/GET-PRODUCTS";
import { ProductCard } from "../components/product-card";
import axios from "axios";

const Marketplace = () => {
    const [items, setItems] = useState([]);

    const deleteProduct = id => {
        axios.delete(`https://ecomm-service.herokuapp.com/marketplace/${id}`)
        .then(()=>{getProducts();});
    }

    const editProduct = id => {
        axios.patch(`https://ecomm-service.herokuapp.com/marketplace/${id}`)
        .then(()=>{getProducts();});
    }

    const getProducts = () => {
        axios.get('https://ecomm-service.herokuapp.com/marketplace')
        .then(res=>{
            console.log(res.data);
            return setItems(res.data)
        });
    }

    useEffect(()=>{
        getProducts();
    }, [])

    return (
        <div>
            <p><span className="font-bold text-3xl">Marketplace</span></p>
            <div>
                {items && console.log(items)}
                {items && items.map(item=>{
                    return <ProductCard item={item} key={item._id} delete={deleteProduct} edit={editProduct}/>
                })}
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Marketplace;