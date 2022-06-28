import config from 'config/game'
import { supabase } from 'services'
import { Game } from 'types/game'
import { Question } from 'types/quiz'
import { shuffleArray } from 'utils/shuffleArray'

export const getQuestions = async (
  idCategory: number,
  difficulty: string,
  totalQuestions = config.totalQuestions
) => {
  try {
    let filterCategory = ''

    if (idCategory !== 1) filterCategory = `&category=${idCategory}`

    const ENDPOINT = `https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${difficulty}&type=multiple${filterCategory}`
    const request = await fetch(ENDPOINT)
    const { results } = await request.json()

    return results.map((question: Question) => ({
      ...question,
      listAlternatives: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
  } catch (error) {
    console.log(error)
    return []
  }
}

export const savePreferencesGame = async (game: Game) => {
  const { data, error } = await supabase.from<Game>('Game').insert(game, { returning: 'minimal' })
  if (error) {
    console.log(error)
    return null
  }
  return data
}
