import { useRouter } from 'next/router'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  List,
  ListItem,
  Stack,
  Text
} from '@chakra-ui/react'
import { ExitIc } from 'components/Icons'
import HeaderSeo from 'components/Seo/HeaderSeo'

const RoomGame = () => {
  const { query } = useRouter()
  const { id } = query
  // Here get preferences from store
  console.log(id)
  return (
    <>
      <HeaderSeo title={`Playing on Room ${id}`} content='Enjoy the game ❤️' />
      <Box h='full'>
        <Grid
          m={6}
          gridTemplateColumns={{
            base: '1fr',
            md: '1fr 1fr',
            lg: '1fr 400px'
          }}
          gap={10}
          alignItems='center'
        >
          <GridItem>
            <Heading
              fontWeight='bold'
              fontSize={{
                base: 'xl',
                md: '2xl',
                lg: '3xl'
              }}
            >
              Name room whatever name could be here
            </Heading>
          </GridItem>
          {/* Exit game */}
          <GridItem
            justifySelf='end'
            display={{
              base: 'none',
              md: 'block'
            }}
          >
            <IconButton
              aria-label='Exit game'
              icon={<ExitIc />}
              size='lg'
              backgroundColor='red.500'
              variant='solid'
            />
          </GridItem>
          {/* Question section */}
          <GridItem>
            <Flex direction='column' gap={4}>
              <Box mb='6'>
                <Text color='white' fontWeight='bold' fontSize='3xl'>
                  Question: 5 / 10
                </Text>
                <Text color='#12c69d' fontWeight='bold' fontSize='sm' casing='uppercase'>
                  geography
                </Text>
                <Divider marginTop='2' marginBottom='4' />
                <Text color='white' fontWeight='bold'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio molestiae
                  eligendi optio ad quo quas perspiciatis, aspernatur ullam alias quis est soluta
                  quisquam accusantium ratione, iste ea deserunt doloremque sunt!
                </Text>
              </Box>
              <Box mb='4'>
                <Stack spacing='3'>
                  <Button
                    color='#12c69d'
                    borderColor='#12c69d'
                    boxShadow='none'
                    pointerEvents={false ? 'none' : 'auto'}
                    variant='outline'
                    value='Question one'
                    outline='none'
                    _hover={{ bg: 'rgba(144, 205, 244, 0.10)' }}
                  >
                    <Text>Question number one</Text>
                  </Button>
                  <Button
                    color='#12c69d'
                    borderColor='#12c69d'
                    boxShadow='none'
                    pointerEvents={false ? 'none' : 'auto'}
                    variant='outline'
                    value='Question one'
                    outline='none'
                    _hover={{ bg: 'rgba(144, 205, 244, 0.10)' }}
                  >
                    <Text>Question number two</Text>
                  </Button>
                  <Button
                    color='#12c69d'
                    borderColor='#12c69d'
                    boxShadow='none'
                    pointerEvents={false ? 'none' : 'auto'}
                    variant='outline'
                    value='Question one'
                    outline='none'
                    _hover={{ bg: 'rgba(144, 205, 244, 0.10)' }}
                  >
                    <Text>Question number three</Text>
                  </Button>
                  <Button
                    color='#12c69d'
                    borderColor='#12c69d'
                    boxShadow='none'
                    pointerEvents={false ? 'none' : 'auto'}
                    variant='outline'
                    value='Question one'
                    outline='none'
                    _hover={{ bg: 'rgba(144, 205, 244, 0.10)' }}
                  >
                    <Text>Question number four</Text>
                  </Button>
                </Stack>
              </Box>
            </Flex>
          </GridItem>
          {/* Participants section*/}
          <GridItem alignSelf='start' h='full' position='relative'>
            <Box p={6} border='none' backgroundColor='gray.700' borderRadius='lg' h='full'>
              <Text color='white' fontWeight='bold' fontSize='3xl' mb={6}>
                Participants
              </Text>
              <List spacing={6}>
                <ListItem display='flex' flexDirection='row' gap='10px' alignItems='center'>
                  <Avatar size='sm' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                  <Text fontSize='xl' fontWeight='semibold'>
                    dan
                  </Text>
                </ListItem>
                <ListItem display='flex' flexDirection='row' gap='10px' alignItems='center'>
                  <Avatar size='sm' name='midudev' src='https://midu.dev/images/tags/me.png' />
                  <Text fontSize='xl' fontWeight='semibold'>
                    midudev
                  </Text>
                </ListItem>
              </List>
            </Box>
            <Box
              display={{
                base: 'block',
                md: 'none'
              }}
              position='absolute'
              bottom='10px'
              right='10px'
            >
              <IconButton
                aria-label='Exit game'
                icon={<ExitIc />}
                size='lg'
                backgroundColor='red.500'
                variant='solid'
              />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}

export default RoomGame
