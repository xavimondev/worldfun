import type { GetServerSideProps, NextPage } from 'next'
import { Flex, Heading } from '@chakra-ui/react'
import { Profile } from 'types/user'
import { getUserProfileFormatted } from 'utils/getProfile'
import { supabase } from 'services'
import { saveProfile } from 'services/profile'
import useAuth from 'hooks/useAuth'
import HeaderSeo from 'components/Seo/HeaderSeo'
import Layout from 'components/Layout'
import DifficultyPanel from 'components/Game/DifficultyPanel'
import CategoryPanel from 'components/Game/CategoryPanel'
import ModePanel from 'components/Game/ModePanel'

type Props = {
  profile: Profile
}

const Home: NextPage<Props> = ({ profile }) => {
  useAuth()
  return (
    <>
      <HeaderSeo title='Home' content='Welcome to this world' />
      <Layout profile={profile}>
        <Flex direction='column' gap={8}>
          <Heading fontSize='3xl' fontWeight='semibold'>
            Start New Game
          </Heading>
          <Flex direction='column' gap={4} alignItems='center' alignContent='center'>
            <ModePanel />
            <DifficultyPanel />
            <CategoryPanel />
          </Flex>
        </Flex>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (!user) {
    return { redirect: { destination: '/auth', permanent: false } }
  }

  // TODO: Eventually, this code will be improved because the validation
  //should be done only the first time that user enter to application
  // Besides, the validation should take place in all pages
  const profile = getUserProfileFormatted(user)
  profile && (await saveProfile(profile))
  return { props: { profile } }
}

export default Home
