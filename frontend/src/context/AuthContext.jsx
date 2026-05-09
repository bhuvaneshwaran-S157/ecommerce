import { createContext, useContext, useState } from 'react'
import { userApi } from '../api'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  const login = async (data) => {
    const res = await userApi.login(data)
    setUser(res.data)
    localStorage.setItem('user', JSON.stringify(res.data))
    toast.success(`Welcome back, ${res.data.name}!`)
    return res.data
  }

  const register = async (data) => {
    const res = await userApi.register(data)
    setUser(res.data)
    localStorage.setItem('user', JSON.stringify(res.data))
    toast.success(`Account created! Welcome, ${res.data.name}!`)
    return res.data
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    toast.success('Logged out')
  }

  const updateUser = (updated) => {
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
