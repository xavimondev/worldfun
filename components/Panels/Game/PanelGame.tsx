import { Box, Divider, Flex, HStack, Text } from '@chakra-ui/react'
import { getColorByDifficulty } from 'utils/getColorByDifficulty'
import ListAlternatives from 'components/Alternatives/List'
import Question from './Question'

type Props = {
  currentNumberQuestion: number
  category: string
  difficulty: string
  question: string
  listAlternatives: string[]
  correctAnswer: string
  userAnswer: string
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const PanelGame = ({
  currentNumberQuestion,
  category,
  difficulty,
  question,
  listAlternatives,
  correctAnswer,
  userAnswer,
  checkAnswer
}: Props) => {
  return (
    <>
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
          <Question question={question} />
        </Box>
        <Box mb='4'>
          <ListAlternatives
            listAlternatives={listAlternatives}
            correctAnswer={correctAnswer}
            userAnswer={userAnswer}
            checkAnswer={checkAnswer}
          />
        </Box>
      </Flex>
    </>
  )
}

export default PanelGame
