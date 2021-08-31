export default function MarketItem({item, title, description, price, condition, imageUrl, availability, numOfStock, handleAddCart}) {
    return (
        <div className="w-96">
            <img className="" src={imageUrl} alt={title} />
            <div className="grid grid-cols-5 gap-4 auto-rows-1 mt-4">
                <p className="col-span-4"><span>{title}</span></p>
                <p className="col-span-1 justify-self-end text-lg bold font-medium">${price}</p>
                <p className="col-span-5 row-span-3 font-light">{description}</p>
                <p className="col-span-3 border-t-2 pt-3">Condition: {condition}</p>
                <p className="col-span-2 justify-self-end border-t-2 pt-3">{availability==="single-item"? "single-item" : `in-stock: ${numOfStock}`}</p>
                <button className="hover:bg-red-400 h-8 px-3 mt-10 col-span-5 row-span-4 justify-self-end text-white rounded-full bg-black" onClick={()=> handleAddCart(item)}>Add to cart</button>
            </div>
        </div>
    )
}