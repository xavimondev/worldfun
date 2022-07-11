import { supabase } from './'
import { Profile } from 'types/user'

// TODO: Add method to search profile before save it
export const saveProfile = async (profile: Profile) => {
  const { error } = await supabase
    .from<Profile>('Profile')
    .insert(profile, { returning: 'minimal' })

  if (error) {
    console.error(error)
    return null
  }
}

// TODO: Add functionality to update user's profile
