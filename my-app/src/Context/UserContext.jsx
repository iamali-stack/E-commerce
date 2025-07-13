import { createContext, useEffect, useState } from "react";


export let UserContext = createContext(0);
export default function UserContextProvider(props) {

const[userLogin,setuserLogin]=useState(null)
// Check if user token exists in localStorage and set it to userLogin state
useEffect(() => {
if (localStorage.getItem('usertoken')!== null) {
    setuserLogin(localStorage.getItem('usertoken'))
}}, [])
    return <UserContext.Provider value={{userLogin,setuserLogin}}>

        {props.children}
        </UserContext.Provider >
}