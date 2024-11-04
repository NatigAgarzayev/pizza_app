import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import pizzasServices from "@/services/pizzas.services"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import TagsInput from "./TagsInput"

export function AdminCreateModal() {

    const client = useQueryClient()

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState<number>(0)
    const [ingredients, setIngredients] = useState("")
    const [image, setImage] = useState()

    const mutateCreate = useMutation(['add pizza'], () => pizzasServices.addNewPizza(title, price, ingredients, image.name), {
        onSuccess() {
            client.invalidateQueries(['pizzas'])
        }
    })

    const handleAddPizza = () => {
        const formData = new FormData();
        formData.append('image', image)
        pizzasServices.uploadImage(formData)
        const data = { title, price, ingredients, formData }
        mutateCreate.mutate(data)
    }


    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    Add Pizza
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Pizza</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                    <div className=" mb-4">
                        <Label htmlFor="name" className="text-right">
                            PIzza name
                        </Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="name"
                            className="col-span-3"
                            type="text"
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="price" className="text-right">
                            Pizza price
                        </Label>
                        <Input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            id="price"
                            className="col-span-3"
                            type="number"
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="ingredients" className="text-right">
                            Pizza ingredients
                        </Label>
                        <TagsInput setIngredients={setIngredients} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="image" className="text-right">
                            Pizza image
                        </Label>
                        <Input
                            accept=".png, .jpeg, .webp"
                            value={undefined}
                            onChange={(e) => setImage(e.target.files[0])}
                            id="image"
                            className="col-span-3"
                            type="file"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddPizza} type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent >
        </Dialog >
    )
}
