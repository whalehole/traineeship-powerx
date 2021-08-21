import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

export const ProductCard = (props) => {
    console.log(props.item);
    return (
        <div>
            <img src={props.item.imageUrl}></img>
            <p><span className="text-sm">RM</span> <span className="font-bold text-lg">{props.item.price}</span></p>
            <p>{props.item.availability == "single-item" ? "Only One" : `${props.item.numOfStock} piece available`}</p>
            <p>{props.item.description}</p>
            <button className="bg-red-500">
                <PencilIcon className="h-5 w-5 text-white"/><span>EDIT</span>
            </button>
            <button onClick={()=>{props.delete(props.item._id)}}>
                <TrashIcon className="h-5 w-5 text-red-500"/><span>DELETE</span>
            </button>
        </div>
    )
}

// availability: "single-item"
// condition: "used_fair"
// createdAt: "2021-08-21T08:57:26.202Z"
// description: "Juice Drink Concept"
// imageUrl: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?ixid=MnwyNDY1NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjYyNDYyMDc&ixlib=rb-1.2.1&auto=format&fit=crop&w=543&h=384&q=80"
// price: 938
// title: "Bike"
// updatedAt: "2021-08-21T08:57:26.202Z"
// __v: 0
// _id: "6120bff6e5732a0020e9dcc5"

// availability: "in-stock"
// condition: "used_fair"
// createdAt: "2021-08-21T08:57:26.188Z"
// description: "NIKE FREE"
// imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwyNDY1NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjYyNDYyMDc&ixlib=rb-1.2.1&auto=format&fit=crop&w=543&h=384&q=80"
// numOfStock: 2
// price: 999
// title: "Tuna"
// updatedAt: "2021-08-21T08:57:26.188Z"
// __v: 0
