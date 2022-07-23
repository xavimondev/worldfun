import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Avatar, Box, Grid, GridItem, List, ListItem, Text } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'

import config from 'config/game'
import { showNotification } from 'utils/notification'
import { copyTextToClipboard } from 'utils/copyClipboard'
import { getUserProfileFormatted } from 'utils/getProfile'
import { Profile } from 'types/user'
import { Question } from 'types/quiz'
import { supabase } from 'services'
import { getQuestions } from 'services/game'

import { useGame } from 'context/GameContext'
import RoomLoader from 'components/Loaders/RoomLoader'
import HeaderSeo from 'components/Seo/HeaderSeo'
import ExitGameButton from 'components/Buttons/CloseButton'
import PanelGame from 'components/Panels/Game/PanelGame'
import GameHeader from 'components/Panels/Game/GameHeader'

// Realtime
import io, { Socket } from 'socket.io-client'
import { REALTIME_SERVER } from 'config/game'

type Props = {
  dataGame: Question[]
  profile: Profile
}

let socket: Socket | null = null

const RoomGame = ({ dataGame, profile }: Props) => {
  const [currentNumberQuestion, setCurrentNumberQuestion] = useState<number>(0)
  const [totalScore, setTotalScore] = useState<number>(0)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [correctAnswer, setCorrectAnswer] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [listParticipants, setListParticipants] = useState<Profile[]>([])
  // const { listParticipants, setListParticipants } = useSubscription()
  const { room, checkRoomExists, setRoom } = useGame()
  const { code, name } = room
  const { category, difficulty, question, listAlternatives } = dataGame[currentNumberQuestion]

  const { query } = useRouter()
  const { id } = query

  useEffect(() => {
    const socketData = {
      user: profile,
      room: id
    }
    socket = io(REALTIME_SERVER, {
      extraHeaders: {
        'x-data': JSON.stringify(socketData)
      }
    })
  }, [])

  useEffect(() => {
    if (!socket) return

    // Listening for upcoming participants
    socket.on('new-user', (newParticipant: Profile) => {
      // console.log(`Listen for new participant: ${JSON.stringify(newParticipant)}`)
      setListParticipants((prevParticipants) => [...prevParticipants, newParticipant])
    })

    // Listening for participants are connected
    socket.on('connected-users', (participantsConnected: Profile[]) => {
      // console.log(`Participants already connected: ${participantsConnected}`)
      const currentParticipant = { ...profile }
      setListParticipants([currentParticipant, ...participantsConnected])
    })

    socket.on('user-left', (participantDisconnected: Profile) => {
      setListParticipants((prevParticipants) =>
        prevParticipants.filter((par) => par.userId !== participantDisconnected.userId)
      )
    })
    // setIsLoading(true)
    // if (id) {
    //   const roomId = id as string
    //   checkRoomExists(roomId).then((room: Room | undefined) => {
    //     setIsLoading(false)
    //     if (room) {
    //       const { name, code, id } = room
    //       const userId = supabase.auth.user()!.id
    //       setRoom({ name, code })
    //       getParticipantsByRoom(id, userId).then((response) => {
    //         if (response && response.length > 0) {
    //           const participantRegistered = response.at(0)
    //           setListParticipants((prevParticipants) => [
    //             ...prevParticipants,
    //             participantRegistered
    //           ])
    //           console.log(response)
    //         }
    //       })
    //     }
    //   })
    // }

    return () => {
      socket?.off('new-user')
      socket?.off('connected-users')
      socket?.off('user-left')
      socket?.disconnect()
    }
  }, [])
  // Copy to clipboard the shareableCode and then show notification
  const copyCode = async (code: string) => {
    await copyTextToClipboard(code)
    showNotification('Code copied to clipboard', 'success')
  }

  if (isLoading) return <RoomLoader roomName={name} />

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
      <HeaderSeo title={`Playing on Room ${name}`} content='Enjoy the game ❤️' />
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
            <GameHeader roomName={`${name}`} copyCode={() => copyCode(code)} />
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
          <GridItem>
            {/* Panel game question and its alternatives */}
            <PanelGame
              currentNumberQuestion={currentNumberQuestion}
              category={category}
              difficulty={difficulty}
              question={question}
              listAlternatives={listAlternatives}
              correctAnswer={correctAnswer}
              userAnswer={userAnswer}
              checkAnswer={checkAnswer}
            />
          </GridItem>
          {/* Participants section*/}
          <GridItem alignSelf='start' h='full' position='relative'>
            <Box p={6} border='none' backgroundColor='gray.700' borderRadius='lg' h='full'>
              <Text color='white' fontWeight='bold' fontSize='3xl' mb={6}>
                Participants
              </Text>
              <List spacing={6}>
                {listParticipants.map((participant) => (
                  <ListItem
                    display='flex'
                    flexDirection='row'
                    gap='10px'
                    alignItems='center'
                    key={participant.userId}
                  >
                    <Avatar size='sm' name={participant.fullName} src={participant.avatar} />
                    <Text fontSize='xl' fontWeight='semibold'>
                      {profile.userId === participant.userId
                        ? `${participant.fullName}(You)`
                        : participant.fullName}
                    </Text>
                  </ListItem>
                ))}
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
      <Toaster />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { redirect: { destination: '/auth', permanent: false } }
  }
  const { idCategory, difficulty } = query
  let data = []

  if (idCategory && difficulty) {
    const idCategorySelected = Number(idCategory)
    const difficultySelected = String(difficulty)
    data = await getQuestions(idCategorySelected, difficultySelected)
  }

  const profile = getUserProfileFormatted(user)

  return {
    props: {
      dataGame: data,
      profile
    }
  }
}

export default RoomGame
