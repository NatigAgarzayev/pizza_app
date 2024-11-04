import usePizzas from '@/hooks/usePizzas'
import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import Loader from '../../components/ui/loader'
import { AdminEditModal } from '@/components/AdminEditModal'
import { AdminCreateModal } from '@/components/AdminCreateModal'

interface IEditModal {
    id: number
    action: boolean
}

export default function AdminPizzas() {
    const pizzas = usePizzas()

    const [editModal, setEditModal] = useState<IEditModal>({ id: 0, action: false })

    const [cPage, setCPage] = useState(1)
    const step = 5
    const lastIndex = cPage * step
    const firstIndex = lastIndex - step
    const arrPart = pizzas.data?.slice(firstIndex, lastIndex)

    const handlePrev = () => {
        if (cPage !== 1) {
            setCPage(cPage - 1)
        }
    }

    const handleNext = () => {
        if (cPage < Math.ceil(pizzas.data.length / step)) {
            setCPage(cPage + 1)
        }
    }

    const handleDialog = (id: number) => {
        setEditModal({ id: id, action: true })
    }

    if (pizzas.isLoading) return <Loader />

    return (
        <>
            {
                editModal.action && <AdminEditModal editModal={editModal} setEditModal={setEditModal} />
            }
            <div className="px-10">
                <h2 className="font-clashDisplay text-6xl font-bold my-10">Pizzas table</h2>

                <div className="flex items-center gap-4 mb-2">
                    <div>
                        <Button onClick={handlePrev} variant="outline">Prev</Button>
                    </div>
                    <div>
                        {cPage}
                    </div>
                    <div>
                        <Button onClick={handleNext} variant="outline">Next</Button>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Pizza ID</TableHead>
                            <TableHead>Pizza name</TableHead>
                            <TableHead>Pizza ingredients</TableHead>
                            <TableHead>Pizza image</TableHead>
                            <TableHead className="text-right">Pizza price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {arrPart?.map((item) => (
                            <TableRow onClick={() => handleDialog(item.pizza_id)} key={item.pizza_id}>
                                <TableCell className="font-medium">{item.pizza_id}</TableCell>
                                <TableCell>{item.pizza_name}</TableCell>
                                <TableCell>{item.pizza_ingredients}</TableCell>
                                <TableCell>
                                    <img className="w-[50px] h-[50px]" src={`http://localhost:3001/${item.pizza_image}`} alt="" />
                                </TableCell>
                                <TableCell className="text-right">${item.pizza_price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <AdminCreateModal />
            </div>
        </>
    )
}
