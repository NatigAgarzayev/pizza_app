import Pizzas from '@/components/Pizzas'
import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import * as SheetPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import CartContent from "../../components/CartContent"
import { Link } from 'react-router-dom'

export default function Menu() {

    const limit: number = 0

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("order")) || [])
    window.addEventListener('storage', () => {
        console.log("Change to local storage!");
        setCart(JSON.parse(localStorage.getItem("order")))
    })


    return (
        <>
            {
                cart && cart.length > 0 &&
                <Sheet>
                    <SheetPrimitive.Overlay
                        className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-neutral-950/80"
                    />
                    <SheetTrigger className="fadeUp fixed z-[1000] top-20 right-20">
                        <div>
                            <div className="relative">
                                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2" viewBox="0 0 35 35" id="cart">
                                    <path d="M27.47,23.93H14.92A5.09,5.09,0,0,1,10,20L8,11.87a5.11,5.11,0,0,1,5-6.32h16.5a5.11,5.11,0,0,1,5,6.32l-2,8.15A5.1,5.1,0,0,1,27.47,23.93ZM12.94,8.05a2.62,2.62,0,0,0-2.54,3.23l2,8.15a2.6,2.6,0,0,0,2.54,2H27.47a2.6,2.6,0,0,0,2.54-2l2-8.15a2.61,2.61,0,0,0-2.54-3.23Z"></path>
                                    <path d="M9.46 14a1.25 1.25 0 0 1-1.21-1L6.46 5.23A3.21 3.21 0 0 0 3.32 2.75H1.69a1.25 1.25 0 0 1 0-2.5H3.32A5.71 5.71 0 0 1 8.9 4.66l1.78 7.77a1.24 1.24 0 0 1-.93 1.5A1.43 1.43 0 0 1 9.46 14zM15.11 34.75a4 4 0 1 1 4-4A4 4 0 0 1 15.11 34.75zm0-5.54a1.52 1.52 0 1 0 1.52 1.52A1.52 1.52 0 0 0 15.11 29.21zM28.93 34.75a4 4 0 1 1 4-4A4 4 0 0 1 28.93 34.75zm0-5.54a1.52 1.52 0 1 0 1.53 1.52A1.52 1.52 0 0 0 28.93 29.21z"></path>
                                    <path d="M28.93,29.21H12.27a3.89,3.89,0,1,1,0-7.78h2.65a1.25,1.25,0,1,1,0,2.5H12.27a1.39,1.39,0,1,0,0,2.78H28.93a1.25,1.25,0,0,1,0,2.5Z"></path>
                                </svg>
                                <div className="absolute h-6 font-clashDisplay font-semibold text-sm flex items-center justify-center rounded-full px-2 text-center z-[11000] bg-orange-300 -bottom-2 -right-2">{cart.length}</div>
                            </div>
                        </div>
                    </SheetTrigger>
                    <SheetContent className="z-[1001]">
                        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </SheetPrimitive.Close>
                        <SheetHeader className="p-6">
                            <SheetTitle>Your order</SheetTitle>
                            <SheetDescription>
                                You can manage your order here : )
                            </SheetDescription>
                        </SheetHeader>
                        <div>
                            <CartContent />
                        </div>
                    </SheetContent>
                </Sheet >

            }
            <Link to="/">
                <div className="absolute top-20 left-20 border-2 p-2 rounded-full">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </div>
            </Link>
            <div className="min-h-screen container max-w-[1300px] pt-[60px] pb-28">
                <h2 className="font-clashDisplay font-semibold text-[64px] text-primary text-center">Menu</h2>
                <Pizzas limit={limit} />
            </div>
        </>
    )
}
