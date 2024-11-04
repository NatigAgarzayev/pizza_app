import axios from "axios"


export default new class OrdersServices {

    private URL = "http://localhost:3001"

    getAllOrders = async () => {
        return await axios.get(`${this.URL}/get_all_orders`).then(res => res.data).then(res => res.data)
    }
}