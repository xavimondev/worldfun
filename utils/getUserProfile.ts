import { User } from '@supabase/supabase-js'
import { Profile } from 'types/user'

const getUserDataFromProvider = (user: User) => {
  const { user_metadata } = user
  const { avatar_url, email, name } = user_metadata
  return { avatar_url, email, username: name }
}

export const getUserProfile = async (user: User) => {
  let profile: Profile | undefined = undefined
  const { app_metadata } = user

  // Get data from provider
  const { provider } = app_metadata
  if (provider) {
    profile = getUserDataFromProvider(user)
  }

  return profile
}
