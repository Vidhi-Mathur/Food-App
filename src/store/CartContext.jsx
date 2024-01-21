import React, { createContext, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    addItems: (item) => {},
    removeItems: (id) => {},
    clearCart: () => {}
})

function cartReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const updatedItems = [...state.items]
        if(existingItemIndex > -1){
            const existingItem = state.items[existingItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
        updatedItems[existingItemIndex] = updatedItem
        }
        else updatedItems.push({...action.item, quantity: 1})
        return {
            ...state, items: updatedItems
        }
    }
    if(action.type === 'REMOVE_ITEM'){
        const existingItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingItem = state.items[existingItemIndex]
        const updatedItems = [...state.items]
        if(existingItem.quantity === 1){
            updatedItems.splice(existingItemIndex, 1)
        }
        else {
            const updatedItem = {
                ...existingItem, 
                quantity: existingItem.quantity - 1
            }
            updatedItems[existingItemIndex] = updatedItem
        }
    return {
        ...state, items: updatedItems
    }
    }

    if(action.type === 'CLEAR_CART'){
        return {...state, items: []}
    }

    return state
}

export function CartContextProvider({children}) {
    const [cart, dispatch] = useReducer(cartReducer, { items: [] })

    function addItem(item){
        dispatch({type: 'ADD_ITEM', item})
    }

    function removeItem(id){
        dispatch({type: 'REMOVE_ITEM', id})
    }

    function clearCart(){
        dispatch({type: 'CLEAR_CART'})
    }

    const cartContext = {
        items: cart.items,
        addItems: addItem,
        removeItems: removeItem,
        clearCart
    }

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}