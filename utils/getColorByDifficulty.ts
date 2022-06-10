type Color = {
  level: string
  color: string
}

export const getColorByDifficulty = (difficulty: string): string => {
  const colors: any = {
    easy: '#38A169',
    medium: '#DD6B20',
    hard: '#E53E3E'
  }

  return colors[difficulty]
}
