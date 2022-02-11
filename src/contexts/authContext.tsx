import { ReactNode, useContext, useEffect, useState } from "react"
import { createContext } from "react"

interface IAuthContext {
    currentUser: any
}

interface Props {
    children: ReactNode
}

const contextDefaultValues: IAuthContext = {
    currentUser: null,
}

const AuthContext = createContext<IAuthContext>(contextDefaultValues)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: Props) => {

    const [currentUser, setCurrentUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

    }, [])

    const value = {
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
