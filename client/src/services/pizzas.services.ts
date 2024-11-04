import axios from "axios";

interface ICartContent {
    pizzaId: number,
    pizza_image: string
    pizza_name: string,
    pizza_price: string,
    pizza_ingredients: string,
    pizza_quantity: number,
    pizza_size: string
}

export default new class PizzasService {

    private URL = "http://localhost:3001"

    async getAllPizzas() {
        return await axios.get(`${this.URL}/`).then(res => res.data)
    }

    async getPizzaById(id: number) {
        return await axios.get(`${this.URL}/${id}`).then(res => res.data)
    }

    async uploadImage(file: FormData) {
        return await axios.post(`${this.URL}/upload`, file)
    }

    async addNewPizza(pizza_name: string, pizza_price: number, pizza_ingredients: string, pizza_image: string) {
        return await axios.post(`${this.URL}/`, {
            pizza_name,
            pizza_price,
            pizza_ingredients,
            pizza_image
        })
    }

    async editPizza(pizza_name: string, pizza_price: number, pizza_ingredients: string, pizza_image: string, id: number) {
        return await axios.put(`${this.URL}/${id}`, {
            pizza_name,
            pizza_price,
            pizza_ingredients,
            pizza_image
        })
    }

    async deletePizza(id: number) {
        return await axios.delete(`${this.URL}/${id}`)
    }

    async checkoutOrder(cart: ICartContent[]) {
        return await axios.post("http://localhost:3001/create-checkout-session", cart)
            .then((res) => {
                window.location = res.data.url
            })
    }
}

