import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Input } from "./ui/input"
import { useState } from "react"
import Loader from "./ui/loader"
import { useMutation, useQuery, useQueryClient } from "react-query"
import pizzaService from "../services/pizzas.services"
import TagsInput from "./TagsInput"
import usePizza from "@/hooks/usePizza"

interface ISetState {
    editModal: { id: number, action: boolean }
    setEditModal: (props: { id: number, action: boolean }) => void
}

export function AdminEditModal({ editModal, setEditModal }: ISetState) {

    const [pizzaId, setPizzaId] = useState(editModal.id)
    const dataP = useQuery(['pizza'], () => pizzaService.getPizzaById(pizzaId))
    console.log(dataP)
    const client = useQueryClient()

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState<number>(0)
    const [ingredients, setIngredients] = useState("")
    const [image, setImage] = useState("")

    const mutatation = useMutation(['edit pizza'], () =>
        pizzaService.editPizza(title, price, ingredients, image.name, pizzaId),
        {
            onSuccess() {
                client.invalidateQueries(['pizzas'])
                setEditModal({ id: pizzaId, action: false })
            }
        }

    )

    const mutationDelete = useMutation(['delete pizza'], () =>
        pizzaService.deletePizza(pizzaId),
        {
            onSuccess() {
                client.invalidateQueries(['pizzas'])
                setEditModal({ id: pizzaId, action: false })
            }
        }
    )
    const handleEditPizza = () => {
        const formData = new FormData();
        formData.append('image', image)
        pizzaService.uploadImage(formData)
        mutatation.mutate({ title, price, ingredients, formData, pizzaId })
    }


    const handleDeletePizza = () => {
        mutationDelete.mutate(pizzaId)
    }

    return (
        <>
            <div onClick={() => setEditModal({ id: pizzaId, action: false })} className="fadeUp fixed inset-0 z-50 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-neutral-950/80"></div>
            <div className="fadeUp fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-neutral-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:border-neutral-800 dark:bg-neutral-950">
                <div onClick={() => setEditModal({ id: pizzaId, action: false })} className="absolute cursor-pointer right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400">
                    <X className="h-4 w-4" />
                </div>
                <h2 className="font-clashDisplay text-lg font-semibold leading-none tracking-tight">Editing PIZZA - {pizzaId}</h2>
                {
                    dataP.isLoading || mutatation.isLoading ?
                        <Loader />
                        :
                        <div className="font-clashDisplay flex flex-col gap-4">
                            <div>
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Pizza's name" />
                            </div>
                            <div>
                                <Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" min="0" placeholder="Pizza's price" />
                            </div>
                            <div>
                                <TagsInput setIngredients={setIngredients} />
                            </div>
                            <div>
                                <Input value={undefined} onChange={(e) => setImage(e.target.files[0])} type="file" placeholder="Pizza's ingredients" accept=".png, .jpeg, .webp" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Button disabled={mutatation.isLoading ? true : false} onClick={handleEditPizza} variant="default">Save Changes</Button>
                                </div>
                                <div>
                                    <Button disabled={mutatation.isLoading ? true : false} onClick={handleDeletePizza} variant="destructive">Delete Pizza</Button>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}
