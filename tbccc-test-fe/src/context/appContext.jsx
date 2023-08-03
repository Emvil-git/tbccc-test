import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    return (
        <AppContext.Provider value={{user, setUser, users, setUsers, products, setProducts, orders, setOrders}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);