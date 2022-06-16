import { Text } from '@chakra-ui/react'

type Props = {
  question: string
}

const Question = ({ question }: Props) => {
  return (
    <Text
      color='white'
      fontWeight='bold'
      data-testid='question'
      dangerouslySetInnerHTML={{ __html: question }}
    />
  )
}

export default Question
