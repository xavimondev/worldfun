import { NextPage } from 'next'

import HeaderSeo from 'components/Seo/HeaderSeo'
import LoginWithProvider from 'components/Auth/LoginWithProvider'

const Auth: NextPage = () => {
  return (
    <>
      <HeaderSeo title='Login' content='Login to access all games available for you' />
      <LoginWithProvider />
    </>
  )
}

export default Auth
