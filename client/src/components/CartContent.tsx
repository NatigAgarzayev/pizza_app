import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import Loader from './ui/loader'
import pizzasServices from '@/services/pizzas.services'
import { useNavigate } from 'react-router-dom'

interface ICartContent {
    pizzaId: number,
    pizza_image: string
    pizza_name: string,
    pizza_price: string,
    pizza_ingredients: string,
    pizza_quantity: number,
    pizza_size: string
}

export default function CartContent() {
    const nav = useNavigate()
    const [cart, setCart] = useState<ICartContent[]>([])
    const [manageItem, setManageItem] = useState({ id: 0, count: 0, action: false })

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("order")))
    }, [])

    const chekoutSession = useMutation(['checkout'], () => pizzasServices.checkoutOrder(cart))


    const handleIncreaseItem = () => {
        const cartList = cart
        setManageItem({ id: manageItem.id, count: manageItem.count + 1, action: true })
        cartList.forEach(pizza => {
            if (pizza.pizzaId === manageItem.id) {
                pizza.pizza_quantity = manageItem.count + 1
            }
        })
        setCart(cartList)
        localStorage.setItem("order", JSON.stringify(cartList))
    }

    const handleDecreaseItem = () => {
        let cartList = cart
        if (manageItem.count === 1) {
            cartList = cartList.filter(item => item.pizzaId !== manageItem.id)
            setCart(cartList)
            localStorage.setItem("order", JSON.stringify(cartList))
            window.dispatchEvent(new Event("storage"))
        }
        else {
            setManageItem({ id: manageItem.id, count: manageItem.count - 1, action: true })
            cartList.forEach(pizza => {
                if (pizza.pizzaId === manageItem.id) {
                    pizza.pizza_quantity = manageItem.count - 1
                }
            })
            setCart(cartList)
            localStorage.setItem("order", JSON.stringify(cartList))
        }
    }

    const handlePayment = () => {
        // chekoutSession.mutate(cart)
        nav("/order")
    }

    return (
        <div>
            <ul className="flex flex-col">
                {
                    cart && cart.map(item => (
                        <li className="px-6 py-3 hover:bg-slate-100 cursor-pointer" key={item.pizzaId}>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-5" >
                                    <div className="w-[70px] h-[60px]">
                                        <img className="rounded-lg w-full h-full" src={`http://localhost:3001/${item.pizza_image}`} alt="icon-image" />
                                    </div>
                                    <div>
                                        <p className="font-clashDisplay text-base font-semibold">{item?.pizza_name}</p>
                                        <p className="font-roboto mt-2 text-lg text-orange-500">${item?.pizza_price}</p>
                                    </div>
                                </div >
                                <div>
                                    {
                                        manageItem.action && manageItem.id === item.pizzaId ? (
                                            <div className='flex items-center gap-5 justify-between'>
                                                <div onClick={handleDecreaseItem} className='p-3 bg-orange-100 rounded-full cursor-pointer'>
                                                    {
                                                        item.pizza_quantity !== 1 ?
                                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                                            :
                                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                                    }
                                                </div>
                                                <p className="font-clashDisplay select-none text-lg w-[28px] text-center">{manageItem.count}</p>
                                                <div onClick={handleIncreaseItem} className='p-3 bg-orange-100 rounded-full cursor-pointer'>
                                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                                </div>
                                            </div>
                                        )
                                            :
                                            (
                                                <div onClick={() => setManageItem({ id: item.pizzaId, count: item.pizza_quantity, action: true })} className="font-clashDisplay w-10 h-12 flex items-center justify-center border-2 border-slate-200 text-orange-500 rounded-xl hover:border-orange-200">
                                                    {item?.pizza_quantity}
                                                </div>
                                            )
                                    }
                                </div>
                            </div >
                        </li >
                    ))
                }
            </ul >
            <button disabled={chekoutSession.isLoading ? true : false} onClick={handlePayment} className="absolute bottom-4 w-full max-w-[30rem] left-1/2 -translate-x-1/2 flex items-center justify-between transition-colors p-4 bg-orange-200 rounded-lg hover:bg-orange-300 disabled:bg-orange-50">
                {
                    chekoutSession.isLoading ? <Loader /> :
                        <>
                            <p className='font-clashDisplay select-none font-semibold'>${cart.reduce((accum, b) => accum + (+b.pizza_price * b.pizza_quantity), 0).toFixed(2)}</p>
                            <p className="font-clashDisplay select-none font-semibold text-lg">CHECKOUT</p>
                        </>
                }
            </button>
        </div>
    )
}
