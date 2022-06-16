import { Button, Stack, Text } from '@chakra-ui/react'
import { getColorItem } from 'utils/getColorAnswer'

type PropsAltenative = {
  alternative: string
  correctAnswer: string
  userAnswer: string
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Alternative = ({ alternative, correctAnswer, userAnswer, checkAnswer }: PropsAltenative) => {
  return (
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
  )
}

type Props = {
  listAlternatives: string[]
  correctAnswer: string
  userAnswer: string
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ListAlternatives = ({ listAlternatives, correctAnswer, userAnswer, checkAnswer }: Props) => {
  return (
    <Stack spacing='3'>
      {listAlternatives.map((alternative: string) => (
        <Alternative
          key={alternative}
          alternative={alternative}
          correctAnswer={correctAnswer}
          userAnswer={userAnswer}
          checkAnswer={checkAnswer}
        />
      ))}
    </Stack>
  )
}

export default ListAlternatives
