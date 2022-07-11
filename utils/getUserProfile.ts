import { User } from '@supabase/supabase-js'
import { Profile } from 'types/user'

const getUserDataFromProvider = (user: User) => {
  const { user_metadata } = user
  const { avatar_url, email, full_name } = user_metadata
  return { avatar: avatar_url, email, fullName: full_name }
}

export const getUserProfile = async (user: User) => {
  let profile: Profile | undefined = undefined
  const { app_metadata, id } = user

  // Get data from provider
  const { provider } = app_metadata
  if (provider) {
    const dataFormatted = getUserDataFromProvider(user)
    profile = {
      userId: id,
      ...dataFormatted
    }
  }

  return profile
}
