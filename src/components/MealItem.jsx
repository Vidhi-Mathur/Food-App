import React, { useContext } from "react"
import { currencyFormatter } from "../util/formatting"
import Button from "./UI/Button"
import { CartContext } from "../store/CartContext"

export default function MealItem(props){
    const cartCtx = useContext(CartContext)

    function addToCartHandler(){
        cartCtx.addItems(props.meal)
    }
    
    return(
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${props.meal.image}`} alt={props.meal.name} />
                <div>
                    <h3>{props.meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(props.meal.price)}</p>
                    <p className="meal-item-description">{props.meal.description}</p>
                </div>
                <p className="meal-item-actions"><Button onClick={addToCartHandler}>Add To Cart</Button></p>
            </article>
        </li>
    )
}