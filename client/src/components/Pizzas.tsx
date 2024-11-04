import usePizzas from '@/hooks/usePizzas'
import Loader from './ui/loader'
import { useState } from 'react'
import PizzaDetails from './PizzaDetails'

export default function Pizzas({ limit }: { limit: number }) {

    const pizzas = usePizzas()
    const [openedDetails, setOpenedDetails] = useState({ pizzaId: 0, opened: false })

    if (pizzas.isLoading) return <Loader />

    const openPizzaDetails = (id: number) => {
        setOpenedDetails({ pizzaId: id, opened: true })
    }



    return (
        <>
            {
                openedDetails.opened && <PizzaDetails details={openedDetails} setOpened={setOpenedDetails} />
            }
            <div className="fadeUp grid grid-cols-4 gap-4 relative mt-10">
                {
                    limit === 0 ? (pizzas.data.length > 0 ? pizzas.data?.map(pizza => (
                        <div onClick={() => openPizzaDetails(pizza.pizza_id)} key={pizza.pizza_id} className="relative cursor-pointer">
                            <div className="absolute w-full h-full">
                            </div>
                            <div className="w-full p-6 h-[290px]">
                                <img className="h-full rounded-lg" src={`http://localhost:3001/${pizza.pizza_image}`} alt="" />
                            </div>
                            <p className="mt-4 font-clashDisplay text-xl font-bold text-primary text-center">{pizza?.pizza_name}</p>
                            <p className="mt-4 font-roboto text-base font-semibold text-primary text-center">${pizza?.pizza_price}</p>
                        </div>
                    ))
                        :
                        <div className="absolute text-center left-1/2 -translate-x-1/2 top-5 text-xl text-slate-500">No pizzas available for this moment. Sorry : (</div>
                    )
                        :
                        (
                            pizzas.data.length > 0 ? pizzas.data?.slice(0, limit).map(pizza => (
                                <div onClick={() => openPizzaDetails(pizza.pizza_id)} key={pizza.pizza_id} className="relative cursor-pointer">
                                    <div className="absolute w-full h-full">
                                    </div>
                                    <div className="w-full p-6 h-[290px]">
                                        <img className="h-full rounded-lg" src={`http://localhost:3001/${pizza.pizza_image}`} alt="" />
                                    </div>
                                    <p className="mt-4 font-clashDisplay text-xl font-bold text-primary text-center">{pizza?.pizza_name}</p>
                                    <p className="mt-4 font-roboto text-base font-semibold text-primary text-center">${pizza?.pizza_price}</p>
                                </div>
                            ))
                                :
                                <div className="absolute text-center left-1/2 -translate-x-1/2 top-5 text-xl text-slate-500">No pizzas available for this moment. Sorry : (</div>
                        )
                }
            </div>
        </>
    )
}
