import { useEffect, useState } from 'react'

import { supabase } from 'services'
import { Profile } from 'types/user'
import { getUserProfile } from 'utils/getUserProfile'

const useProfile = () => {
  const [profile, setProfile] = useState<Profile | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const user = supabase.auth.user()

  useEffect(() => {
    if (user) {
      setIsLoading(true)

      setTimeout(() => {
        getUserProfile(user).then((profile: Profile | undefined) => {
          setProfile(profile)
          setIsLoading(false)
          console.log('Profile:', profile)
        })
      }, 1500)
    }
  }, [user])

  return {
    profile,
    isLoading
  }
}

export default useProfile
