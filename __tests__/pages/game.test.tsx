import { GetServerSidePropsContext } from 'next'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import RoomGame, { getServerSideProps } from 'pages/game/[id]'
import { ParsedUrlQuery } from 'querystring'
import { getQuestions } from 'services/game'
import questions from 'data/questions.json'
import config from 'config/game'

// Mockup getQuestions function
jest.mock('services/game', () => {
  return {
    getQuestions: jest.fn(() => questions)
  }
})

// Mock: https://github.com/vercel/next.js/discussions/11818
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: 'random-id-for-room' }
  })
}))

const firstQuestion = questions[0]

describe('Testing on game page', () => {
  test('getServerSideProps should return the correct gameData from the api', async () => {
    const context = {
      query: { idCategory: '11', difficulty: 'hard' } as ParsedUrlQuery
    }

    const response = await getServerSideProps(context as GetServerSidePropsContext)

    expect(getQuestions).toHaveBeenCalled()
    expect(getQuestions).toHaveBeenCalledWith(11, 'hard')
    expect(response).toEqual({
      props: {
        dataGame: questions
      }
    })
  })

  beforeEach(() => {
    render(<RoomGame dataGame={questions} />)
  })

  test('page should render progress of questions', () => {
    const firsParagraph = screen.getByText(/Question: 1/).textContent
    expect(firsParagraph).toBe(`Question: 1 / ${config.totalQuestions}`)
  })

  test('page should render first question and its alternatives', () => {
    const ALTERNATIVES = firstQuestion.listAlternatives
    const questionElement = screen.getByTestId('question')
    expect(questionElement).toBeInTheDocument()
    // console.log(questionElement)

    ALTERNATIVES.forEach((alt) => {
      const buttonAlternative = screen.getByRole('button', { name: alt })
      expect(buttonAlternative).toHaveValue(alt)
    })
  })
})
