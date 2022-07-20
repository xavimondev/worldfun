import { Category, Difficulty } from 'types/quiz'

import AnyIcon from 'public/svg/any-icon.svg'
import MovieIcon from 'public/svg/movie-icon.svg'
import MusicIcon from 'public/svg/music-icon.svg'
import VideoGamesIcon from 'public/svg/videogames-icon.svg'
import ComputerIcon from 'public/svg/computer-icon.svg'
import SportIcon from 'public/svg/sport-icon.svg'
import HistoryIcon from 'public/svg/history-icon.svg'
import GeographyIcon from 'public/svg/geography-icon.svg'

const TOTAL_QUESTIONS = 10

const CATEGORIES: Category[] = [
  { id: 1, name: 'Any Category', icon: AnyIcon },
  { id: 11, name: 'Film', icon: MovieIcon },
  { id: 12, name: 'Music', icon: MusicIcon },
  { id: 15, name: 'Video Games', icon: VideoGamesIcon },
  { id: 18, name: 'Computers', icon: ComputerIcon },
  { id: 21, name: 'Sports', icon: SportIcon },
  { id: 22, name: 'History', icon: HistoryIcon },
  { id: 23, name: 'Geography', icon: GeographyIcon }
]

const config = {
  totalQuestions: TOTAL_QUESTIONS,
  categories: CATEGORIES,
  preferences: {
    idCategory: 1,
    nameCategory: 'ANY',
    difficulty: Difficulty.EASY
  }
}

export const REALTIME_SERVER = process.env.REALTIME_SERVER || 'http://localhost:4000'

export default config
