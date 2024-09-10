import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();
export const AuthProvider = ({children})=>{
    const initialAuthUser = localStorage.getItem('email');
    const [authUser , setAuthUser] = useState(initialAuthUser || null);
    console.log("authUser in provider : " , authUser);
    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
