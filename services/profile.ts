import { User } from '@supabase/supabase-js'
import { supabase } from './'
import { Profile } from 'types/user'

export const saveProfile = async (profile: Profile) => {
  const { error } = await supabase
    .from<Profile>('Profile')
    .insert(profile, { returning: 'minimal' })

  if (error) {
    console.error(error)
    return null
  }
}

export const searchProfileByUserId = async (userId: User['id']) => {
  const { data, error } = await supabase
    .from<Profile>('Profile')
    .select('userId, fullName, email, avatar')
    .eq('userId', userId)

  if (error) {
    console.error(error)
    return null
  }
  return data
}

// TODO: Add functionality to update user's profile
