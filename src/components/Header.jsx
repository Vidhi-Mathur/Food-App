import React, { useContext } from 'react'
import Logo from '../assets/logo.jpg'
import Button from './UI/Button'
import { CartContext } from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'

export default function Header(){
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    const totalCartItems = cartCtx.items.reduce((totalNumber, item) => { return totalNumber + item.quantity }, 0)

    function showCartHandler(){
        userProgressCtx.showCart()

    }
    return (
        <header id="main-header">
            <div id="title"> 
                <img src={Logo} alt="logo"/>
                <h1>FoodKoala</h1>
            </div>
            <nav>
                <Button textOnly onClick={showCartHandler}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}