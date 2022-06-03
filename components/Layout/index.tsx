import { Box, Container, Flex } from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import useProfile from 'hooks/useProfile'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const { isLoading, profile } = useProfile()
  const router = useRouter()

  // if (!profile) router.push('/auth')
  if (isLoading) return <h1>Loading...</h1>

  return (
    <Flex m={6} gap={2} direction='column'>
      <Navbar />
      <Box>{children}</Box>
    </Flex>
  )
}

export default Layout
