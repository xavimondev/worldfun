import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Profile } from 'types/user'
import Navbar from 'components/Navbar'

type Props = {
  profile: Profile
  children: React.ReactNode
}

const Layout = ({ profile, children }: Props) => {
  return (
    <Flex m={6} gap={2} direction='column'>
      <Navbar profile={profile} />
      <Box>{children}</Box>
    </Flex>
  )
}

export default Layout
