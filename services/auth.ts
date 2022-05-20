import { User } from '@supabase/supabase-js'
import { supabase } from './'

/**
 * Authentication with provider
 */
type Provider = 'google' | 'discord' | 'twitter' | 'facebook'

export const signInWithProvider = async (provider: Provider) => {
  try {
    const { user, error } = await supabase.auth.signIn({
      provider: provider
    })
    if (error) throw new Error('An error ocurred during authentication')
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

/** Logout */
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error('An error ocurred during logout')
  } catch (error) {
    console.log(error)
    return null
  }
}

// Get profile of specific user
export const getProfile = async (userId: User['id']) => {
  try {
    const { data, error } = await supabase
      .from<User>('profiles')
      .select('username, avatar_url, updated_at')
      .eq('id', userId)
      .single()
    if (error) throw error
    return data
  } catch (error) {
    console.log(error)
  }
}
