'use client'

import { checkSession } from '@/actions/auth.actions'
import { useRouter } from 'next/navigation'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface UserContextType {
  user: any
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkAuth = async () => {
      const sessionUser = await checkSession()
      if (sessionUser) {
        setUser(sessionUser)
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    router.push('/')
  }

  return (
    <UserContext.Provider value={{ user, isAuthenticated, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
