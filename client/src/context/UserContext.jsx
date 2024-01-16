import { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const [userInfo, setUserInfo] = useState({});
    // const getUserInfo = async () => {
    //     try {
    //         const response = await fetch('http://localhost:4000/auth/refetch', {
    //             method: 'GET',
    //             credentials: 'include'
    //         });
    //         if (!response.ok) {
    //             throw new Error(`HTTP Error! Status: ${response.status}`);
    //         }
    //     } catch (error) {
    //         console.log("Error in User Context", error);
    //     }
    // }

    // useEffect(() => {
    //     getUserInfo();
    // }, [])

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
}