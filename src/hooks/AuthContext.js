import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext()

function loadStoredUser() {
  try {
    const stored = localStorage.getItem('chai-auth-user')
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadStoredUser())

  useEffect(() => {
    if (user) {
      localStorage.setItem('chai-auth-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('chai-auth-user')
    }
  }, [user])

  const login = useCallback(({ email, name }) => {
    setUser({ email, name: name || email?.split('@')[0] || 'Chai Lover' })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const register = useCallback(({ email, name }) => {
    setUser({ email, name: name || email?.split('@')[0] || 'Chai Lover' })
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      register,
    }),
    [user, login, logout, register]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
