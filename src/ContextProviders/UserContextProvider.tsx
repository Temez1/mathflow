import { User } from "firebase/auth"
import { createContext, useContext } from "react"

export const UserContext = createContext<User>({} as User)

interface UserContextProviderProps {
  user: User
  children: React.ReactNode
}

export const UserProvider = ({ children, user }: UserContextProviderProps) => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
)

export const useCurrentUser = () => useContext(UserContext)
