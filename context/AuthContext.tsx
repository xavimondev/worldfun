import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { User } from '@supabase/supabase-js'

import { supabase } from 'services'

type AuthState = {
  userInfo: User | undefined | null
}

const AuthContext = createContext<AuthState>({
  userInfo: undefined
})

type Props = {
  children: JSX.Element
}

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<User | undefined | null>(undefined)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUserInfo(session?.user)
        router.push('/')
      }
      if (event === 'SIGNED_OUT') {
        setUserInfo(undefined)
        router.push('/auth')
      }
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <AuthContext.Provider value={{ userInfo }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) throw new Error('useUser must be used within a AuthProvider')

  return context
}
