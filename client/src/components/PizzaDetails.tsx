import React, { useState } from 'react'
import Loader from './ui/loader'
import { useQuery } from 'react-query'
import pizzasServices from '@/services/pizzas.services'
import { X } from 'lucide-react'


export default function PizzaDetails({ details, setOpened }) {

    const [pizzaName, setPizzaName] = useState("")
    const [pizzaIngr, setPizzaIngr] = useState("")
    const [pizzaPrice, setPizzaPrice] = useState(0)
    const [pizzaImage, setPizzaImage] = useState("")
    const [count, setCount] = useState(1)

    const pizzaD = useQuery(['pizza'], () => pizzasServices.getPizzaById(details.pizzaId), {
        onSuccess(data) {
            setPizzaName(data[0]?.pizza_name)
            setPizzaIngr(data[0]?.pizza_ingredients.slice(1,))
            setPizzaPrice(data[0]?.pizza_price)
            setPizzaImage(data[0]?.pizza_image)
        },
    })

    const handleAddCart = () => {
        const order = {
            pizzaId: details.pizzaId,
            pizza_name: pizzaName,
            pizza_price: pizzaPrice,
            pizza_quantity: count,
            pizza_image: pizzaImage,
            pizza_size: "medium"
        }
        if (localStorage.getItem("order")) {
            const localOrderList = JSON.parse(localStorage.getItem("order"))
            console.log(localOrderList)
            if (localOrderList.filter(item => item.pizzaId === details.pizzaId).length > 0) {
                localOrderList.forEach(pizza => {
                    if (pizza.pizzaId === details.pizzaId) {
                        pizza.pizza_quantity += order.pizza_quantity
                    }
                })
            }
            else {
                localOrderList.push(order)
            }
            localStorage.setItem("order", JSON.stringify(localOrderList))
        }
        else {
            const localOrderList = []
            localOrderList.push(order)
            localStorage.setItem("order", JSON.stringify(localOrderList))
        }
        window.dispatchEvent(new Event("storage"))
        setOpened({ pizzaId: details.pizzaId, opened: false })
    }

    return (
        <>
            <div onClick={() => setOpened({ pizzaId: details.pizzaId, opened: false })} className="fadeUp fixed inset-0 z-50 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-neutral-950/80"></div>
            <div className="fadeUp fixed left-[50%] top-[50%] z-50 grid w-full overflow-hidden max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-neutral-200 bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:border-neutral-800 dark:bg-neutral-950">
                <div onClick={() => setOpened({ pizzaId: details.pizzaId, opened: false })} className="absolute bg-white rounded-full p-2 cursor-pointer right-4 top-4 opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400">
                    <X className="h-6 w-6" />
                </div>
                {
                    pizzaD.isLoading ? <Loader /> :
                        <>
                            <div className='h-[340px]'>
                                <img className="w-full h-full object-cover" src={`http://localhost:3001/${pizzaImage}`} alt="" />
                            </div>

                            <div className="p-6">
                                <h2 className="font-clashDisplay text-lg font-semibold leading-none tracking-tight">{pizzaName}</h2>
                                <p className='font-clashDisplay text-base mt-2 text-zinc-500'>{pizzaIngr}</p>
                                <p className='font-clashDisplay text-lg mt-4 leading-none tracking-tight'>$ {pizzaPrice}</p>
                                <div className='mt-4 flex gap-5 items-center justify-between'>
                                    <div className='flex items-center gap-5 justify-between'>
                                        <div onClick={() => setCount(count => count <= 1 ? count : count - 1)} className='p-4 bg-orange-100 rounded-full cursor-pointer'>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                        </div>
                                        <p className="font-clashDisplay select-none text-lg w-[28px] text-center">{count}</p>
                                        <div onClick={() => setCount(count + 1)} className='p-4 bg-orange-100 rounded-full cursor-pointer'>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                        </div>
                                    </div>
                                    <button onClick={handleAddCart} className="flex w-full transition-colors gap-5 justify-between items-center p-4 bg-orange-100 rounded-lg hover:bg-orange-200">
                                        <p className="font-clashDisplay select-none font-semibold text-lg">Add to Cart</p>
                                        <p className='font-clashDisplay select-none font-semibold'>${(count * pizzaPrice).toFixed(2)}</p>
                                    </button>
                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    )
}
