import { createContext, PropsWithChildren, useContext, useState } from "react";

const CartContext = createContext({
    item: [],
    totalAmount: 0,
    addItem: (_item: any) => { },
    removerItme: (_id: string) => { }
})

const CartProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [item, setItem] = useState([]);

    const addItem = (item) => {
        console.log(item)
    }

    return (
        <CartContext.Provider value={{ item }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

export const useCart = () => {
    return useContext(CartContext)
}