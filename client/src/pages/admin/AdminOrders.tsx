import ordersServices from '@/services/orders.services'
import React from 'react'
import { useQuery } from 'react-query'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function AdminOrders() {

    const orders = useQuery(['orders'], () => ordersServices.getAllOrders())
    console.log(orders)

    const handleReciptUrl = (url: string) => {
        window.open(url, "_blank")
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Customer Name</TableHead>
                    <TableHead>Customer email</TableHead>
                    <TableHead>Payed with</TableHead>
                    <TableHead>Order amount</TableHead>
                    {/* <TableHead className="text-right">Pizza price</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.data?.map((item) => (
                    <TableRow onClick={() => handleReciptUrl(item.receipt_url)} key={item.id} className="cursor-pointer">
                        <TableCell className="font-medium">{item.billing_details.name}</TableCell>
                        <TableCell>{item.billing_details.email}</TableCell>
                        <TableCell>{item.payment_method_details.type}</TableCell>
                        <TableCell>{item.payment_method_details.card?.amount_authorized === null ? "Unpayed" : "$" + (item.payment_method_details.card?.amount_authorized / 100).toFixed(2)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
