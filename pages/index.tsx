import type { NextPage } from 'next'

import HeaderSeo from 'components/Seo/HeaderSeo'
import Layout from 'components/Layout'
import { Flex, Heading } from '@chakra-ui/react'
import DifficultyPanel from 'components/Game/DifficultyPanel'
import CategoryPanel from 'components/Game/CategoryPanel'
import ModePanel from 'components/Game/ModePanel'

const Home: NextPage = () => {
  return (
    <>
      <HeaderSeo title='Home' content='Welcome to this world' />
      <Layout>
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

export default Home
