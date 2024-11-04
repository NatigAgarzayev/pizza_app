import pizzasService from '../services/pizzas.services'
import { useQuery } from "react-query"

export default function usePizza(id) {
    const data = useQuery(['pizza'], () => pizzasService.getPizzaById(id))
    return data
}
