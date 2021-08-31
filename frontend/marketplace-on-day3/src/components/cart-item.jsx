export default function CartItem({item, handleDelCart}) {
    return (
        <div className="grid grid-cols-5 auto-rows-1 gap-4">
            <img className="col-span-1 row-span-3 rounded-full" src={item.imageUrl} alt={item.title} />
            <p className="row-span-1 col-span-2">{item.title}</p>
            <p className="row-span-3 col-span-1 place-self-center">${item.combinedPrice}</p>
            <button className="row-span-3 col-span-1 place-self-center hover:bg-red-400 rounded-full" onClick={()=>handleDelCart(item._id)}><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg></button>
            <p className="font-light" >${item.price} x {item.count}</p>
        </div>
    )
}