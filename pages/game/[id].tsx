import { GetServerSideProps } from 'next'
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
  List,
  ListItem,
  Stack,
  Text
} from '@chakra-ui/react'

import { Question } from 'types/quiz'
import { getQuestions } from 'services/game'

import HeaderSeo from 'components/Seo/HeaderSeo'
import RoomLoader from 'components/Loaders/RoomLoader'
import ExitGameButton from 'components/Buttons/CloseButton'

const initialState = {
  questions: [],
  answers: [],
  totalScore: 0,
  isGameOver: false,
  isLeft: true,
  currentNumberQuestion: 0
}
/*
3. Show level and its color
4. Refactor using components
5. Go to the next question after the user clicks the button and specific time
6. Show the correct answer after the user clicks the button
*/

type Props = {
  dataGame: Question[]
}

const RoomGame = ({ dataGame }: Props) => {
  console.log(dataGame)
  const { category, difficulty, question, listAlternatives } = dataGame[0]
  // const { questions, answers, totalScore, isGameOver, isLeft, currentNumberQuestion } = gameDetails
  const { query } = useRouter()
  const { id } = query
  // const currentQuestion = questions[currentNumberQuestion]

  // if (loading) return <RoomLoader roomName='fanny moment with yours' />

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
            <ExitGameButton />
          </GridItem>
          {/* Question section */}
          <GridItem>
            <Flex direction='column' gap={4}>
              <Box mb='6'>
                <Text color='white' fontWeight='bold' fontSize='3xl'>
                  Question: 5 / 10
                </Text>
                <Text color='#12c69d' fontWeight='bold' fontSize='sm' casing='uppercase'>
                  {category} - {difficulty}
                </Text>
                <Divider marginTop='2' marginBottom='4' />
                <Text
                  color='white'
                  fontWeight='bold'
                  dangerouslySetInnerHTML={{ __html: question }}
                />
              </Box>
              <Box mb='4'>
                <Stack spacing='3'>
                  {listAlternatives.map((alternative: string) => (
                    <Button
                      key={alternative}
                      color='#12c69d'
                      borderColor='#12c69d'
                      boxShadow='none'
                      pointerEvents={false ? 'none' : 'auto'}
                      variant='outline'
                      value='Question one'
                      outline='none'
                      _hover={{ bg: 'rgba(144, 205, 244, 0.10)' }}
                    >
                      <Text dangerouslySetInnerHTML={{ __html: alternative }} />
                    </Button>
                  ))}
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
              <ExitGameButton />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { idCategory, difficulty } = query
  let data = []

  if (idCategory && difficulty) {
    const idCategorySelected = Number(idCategory)
    const difficultySelected = String(difficulty)
    data = await getQuestions(idCategorySelected, difficultySelected)
    // TODO: Save preferences on database
  }

  return {
    props: {
      dataGame: data
    }
  }
}

export default RoomGame
