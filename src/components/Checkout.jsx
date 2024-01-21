import React, { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Error from "./Error";
import useHttp from "../hooks/useHttp";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

const reqConfig = { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Checkout(){
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)
    
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.price*item.quantity, 0)

    const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp('http://localhost:3000/ordersss', reqConfig)

    function closeCheckoutHandler(){
        userProgressCtx.hideCheckout()
    }

    function finishCheckoutHandler(){
        userProgressCtx.hideCheckout()
        cartCtx.clearCart()
        clearData()
    }

    function submitHandler(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    //As key-value pair
    const customerData = Object.fromEntries(formData.entries())
    //As expected on backend
    sendRequest(JSON.stringify({
        order: {
            items: cartCtx.items,
            customer: customerData
        }
    }))
    }

    let actions = (
        <>
        <Button type="button" textOnly onClick={closeCheckoutHandler}>Close</Button>
        <Button>Order</Button>
        </>
    )

    if(isSending){
        actions = <span>Sending Order data...</span>
    }

    if(data && !error){
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={finishCheckoutHandler}>
                <h2>Success!</h2>
                <p>Your order was submitted successfully</p>
                <p>We'll get back to you with more details via email within next few minutes</p>
                <p className="modal-actions"><Button onClick={finishCheckoutHandler}>Okay</Button></p>
            </Modal>
        )
    }
    
    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={closeCheckoutHandler}>
            <form onSubmit={submitHandler}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="E-Mail Address" id="email" type="email"/>
                <Input label="Street" id="street" type="text"/>
                <div className="control-row">
                    <Input label="Postal Code" type="number" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>
                {error && <Error title="Failed to submit order" message={error}/>}
                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    )
}