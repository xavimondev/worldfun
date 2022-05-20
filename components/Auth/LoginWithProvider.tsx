import { Button, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { DiscordIc, FacebookIc, GoogleIc, TwitterIc } from 'components/Icons'
import { signInWithProvider } from 'services/auth'

const LoginWithProvider = () => {
  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Stack spacing={4} w='full' maxW='md' rounded='xl' boxShadow='lg' p={6} bg='gray.900'>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: '2xl', md: '3xl' }}
          mb='2rem'
          color='white'
          fontWeight={'semibold'}
        >
          Log in to continue
        </Heading>
        {/* Google */}
        <Button w='full' leftIcon={<GoogleIc />} onClick={() => signInWithProvider('google')}>
          <Center>
            <Text>Continue with Google</Text>
          </Center>
        </Button>
        {/* Discord */}
        <Button w='full' leftIcon={<DiscordIc />} onClick={() => signInWithProvider('discord')}>
          <Center>
            <Text>Continue with Discord</Text>
          </Center>
        </Button>
        {/* Twitter */}
        <Button w='full' leftIcon={<TwitterIc />} onClick={() => signInWithProvider('twitter')}>
          <Center>
            <Text>Continue with Twitter</Text>
          </Center>
        </Button>
        {/* Facebook */}
        <Button
          w='full'
          leftIcon={<FacebookIc width='25px' height='25px' />}
          onClick={() => signInWithProvider('facebook')}
        >
          <Center>
            <Text>Continue with Facebook</Text>
          </Center>
        </Button>
      </Stack>
    </Flex>
  )
}

export default LoginWithProvider
