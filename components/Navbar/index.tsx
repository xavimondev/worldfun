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
  useColorModeValue
} from '@chakra-ui/react'
import { logout } from 'services/auth'
import useProfile from 'hooks/useProfile'
import Search from 'components/Search'

const Navbar = () => {
  const bg = useColorModeValue('blue.400', '#181b29')
  const { profile } = useProfile()
  return (
    <>
      <Box rounded='lg'>
        <Flex h='auto' width='full' alignItems='center' justifyContent='space-between' gap={6}>
          <Search />
          <Stack direction='row' spacing={7} alignSelf='flex-start'>
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
                  {/* <MenuItem>
                    <Link href='/settings'>Settings</Link>
                  </MenuItem> */}
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
