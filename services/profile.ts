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
