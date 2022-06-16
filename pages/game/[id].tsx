import { useState } from 'react'
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
  HStack,
  List,
  ListItem,
  Stack,
  Text
} from '@chakra-ui/react'

import config from 'config/game'
import { Question } from 'types/quiz'
import { getQuestions } from 'services/game'

import { getColorItem } from 'utils/getColorAnswer'
import { getColorByDifficulty } from 'utils/getColorByDifficulty'

// import RoomLoader from 'components/Loaders/RoomLoader'
import HeaderSeo from 'components/Seo/HeaderSeo'
import ExitGameButton from 'components/Buttons/CloseButton'

type Props = {
  dataGame: Question[]
}

const RoomGame = ({ dataGame }: Props) => {
  const [currentNumberQuestion, setCurrentNumberQuestion] = useState<number>(0)
  const [totalScore, setTotalScore] = useState<number>(0)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [correctAnswer, setCorrectAnswer] = useState<string>('')

  const { category, difficulty, question, listAlternatives } = dataGame[currentNumberQuestion]

  const { query } = useRouter()
  const { id } = query

  // if (loading) return <RoomLoader roomName='fanny moment with yours' />

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isGameOver) {
      const answerValue = e.currentTarget.value
      const correctAnswer = dataGame[currentNumberQuestion].correct_answer
      const isCorrect = correctAnswer === answerValue

      setUserAnswer(answerValue)
      setCorrectAnswer(correctAnswer)

      if (isCorrect) setTotalScore((prevScore: number) => prevScore + 1)

      // If current number of question is equal to the number total of questions, it means that the game is over
      const currentPosQuestion = currentNumberQuestion + 1
      if (currentPosQuestion === config.totalQuestions) {
        setIsGameOver(true)
      } else {
        setTimeout(() => {
          setCurrentNumberQuestion((currentNumberQuestion: number) => currentNumberQuestion + 1)
        }, 1000)
      }
    }
  }

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
                  Question: {currentNumberQuestion + 1} / 10
                </Text>
                <HStack>
                  <Text color='#12c69d' fontWeight='bold' fontSize='sm' casing='uppercase'>
                    {category}
                  </Text>
                  <Text
                    color={getColorByDifficulty(difficulty)}
                    fontWeight='bold'
                    fontSize='sm'
                    casing='uppercase'
                  >
                    {difficulty}
                  </Text>
                </HStack>
                <Divider marginTop='2' marginBottom='4' />
                <Text
                  color='white'
                  fontWeight='bold'
                  data-testid='question'
                  dangerouslySetInnerHTML={{ __html: question }}
                />
              </Box>
              <Box mb='4'>
                <Stack spacing='3'>
                  {listAlternatives.map((alternative: string) => (
                    <Button
                      key={alternative}
                      color={getColorItem(alternative, correctAnswer, userAnswer)}
                      borderColor={getColorItem(alternative, correctAnswer, userAnswer)}
                      borderWidth={2}
                      boxShadow='none'
                      variant='outline'
                      value={alternative}
                      name={alternative}
                      onClick={checkAnswer}
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
