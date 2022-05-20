import type { NextPage } from 'next'

import useProfile from 'hooks/useProfile'
import HeaderSeo from 'components/Seo/HeaderSeo'

const Home: NextPage = () => {
  const { isLoading, profile } = useProfile()

  if (!profile) return <h1>No profile</h1>
  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      <HeaderSeo title='Home' content='Welcome to this world' />
      <h1>Another way to gain more experiencies on trivias world</h1>
    </>
  )
}

export default Home
