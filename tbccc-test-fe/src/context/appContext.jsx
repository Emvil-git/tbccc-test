import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const [adminUsers, setAdminUsers] = useState([]);
    const [adminProducts, setAdminProducts] = useState([]);
    const [adminOrders, setAdminOrders] = useState([]);

    const getListedProducts = () => {
    fetch('http://localhost:4000/products/getListed')
        .then(res => res.json())
        .then(data => {
            setProducts(data)})
    }

    const adminGetProducts = (userToken) => {
        fetch('http://localhost:4000/products/getAllProducts', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setAdminProducts(data);
        })
    }

    const adminGetUsers = (userToken) => {
        fetch('http://localhost:4000/users/getAll', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setAdminUsers(data);
        })
    }

    return (
        <AppContext.Provider value={{user, setUser, token, setToken, users, setUsers, products, setProducts, orders, setOrders, adminUsers, setAdminUsers, adminProducts, setAdminProducts, adminOrders, setAdminOrders, getListedProducts, adminGetUsers,adminGetProducts}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);