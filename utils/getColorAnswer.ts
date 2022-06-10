export const getColorItem = (
  alternative: string,
  correctAnswer: string,
  userAnswer: string
): string => {
  const isAnswerCorrect = correctAnswer === alternative
  const isUserClicked = userAnswer === alternative
  return isAnswerCorrect ? '#12c69d' : !isAnswerCorrect && isUserClicked ? 'red.400' : '#aeb2bd'
}
