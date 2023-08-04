import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));

    // variables that control UI state
    const [isShowProductModal, setIsShowProductModal] = useState(false);
    const [isShowAddProductModal, setIsShowAddProductModal] = useState(false);
    const [isShowProfileModal, setIsShowProfileModal] = useState(false);

    // customer-available data
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState();

    // admin-only data
    const [adminUsers, setAdminUsers] = useState([]);
    const [adminProducts, setAdminProducts] = useState([]);
    const [adminOrders, setAdminOrders] = useState([]);

    const getListedProducts = () => {
    fetch('http://localhost:4000/products/getListed')
        .then(res => res.json())
        .then(data => {
            setProducts(data)})
    }

    const refreshUserDetails = (token) => {
    fetch('http://localhost:4000/users/getInfo', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
        .then(data => {
            localStorage.setItem('user',JSON.stringify(data))
            setUser(data);
        })
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
        <AppContext.Provider value={{isShowProductModal, setIsShowProductModal, user, setUser, token, setToken, users, setUsers, products, setProducts, orders, setOrders, selectedProduct, setSelectedProduct, adminUsers, setAdminUsers, adminProducts, setAdminProducts, adminOrders, setAdminOrders, refreshUserDetails, getListedProducts, adminGetUsers,adminGetProducts, isShowAddProductModal, setIsShowAddProductModal, isShowProfileModal, setIsShowProfileModal}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);