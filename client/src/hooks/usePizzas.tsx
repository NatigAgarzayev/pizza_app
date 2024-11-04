import pizzasService from '../services/pizzas.services'
import { useQuery } from "react-query"

export default function usePizzas() {
    const data = useQuery(['pizzas'], () => pizzasService.getAllPizzas())
    return data
}
