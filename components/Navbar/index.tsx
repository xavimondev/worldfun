import Link from 'next/link'
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Input
} from '@chakra-ui/react'
import { logout } from 'services/auth'
import useProfile from 'hooks/useProfile'
import { SearchIc } from 'components/Icons'

const Navbar = () => {
  const bg = useColorModeValue('blue.400', '#181b29')
  const { profile } = useProfile()
  return (
    <>
      <Box rounded='lg' mb={{ base: '35px' }}>
        <Flex h={16} alignItems='center' justifyContent='space-between'>
          <Flex gap='5' alignItems='center'>
            <form>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <SearchIc />
                </InputLeftElement>
                <Input
                  bg={bg}
                  type='search'
                  name='email'
                  border='none'
                  placeholder='Paste game code here'
                  width='auto'
                />
              </InputGroup>
            </form>
            <Button w='auto' bg='blue.400' color='white'>
              Search
            </Button>
          </Flex>
          <Stack direction='row' spacing={7}>
            <Box>
              <Menu>
                <MenuButton as={Button} rounded='full' variant='link' cursor='pointer' minW={0}>
                  <Avatar size='sm' src={profile?.avatar_url} />
                </MenuButton>
                <MenuList alignItems='center' bg={bg}>
                  <Center>
                    <Avatar size='2xl' src={profile?.avatar_url} />
                  </Center>
                  <br />
                  <Center>
                    <p>{profile?.username === '' ? 'Welcome' : profile?.username}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>
                    <Link href='/profile'>Settings</Link>
                  </MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </>
  )
}

export default Navbar
