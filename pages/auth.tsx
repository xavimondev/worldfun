import { GetServerSideProps, NextPage } from 'next'
import { supabase } from 'services'
import useAuth from 'hooks/useAuth'
import LoginWithProvider from 'components/Auth/LoginWithProvider'
import HeaderSeo from 'components/Seo/HeaderSeo'

const Auth: NextPage = () => {
  useAuth()
  return (
    <>
      <HeaderSeo title='Login' content='Login to access all games available for you' />
      <LoginWithProvider />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (user) {
    return { redirect: { destination: '/', permanent: false } }
  }

  return { props: {} }
}

export default Auth
