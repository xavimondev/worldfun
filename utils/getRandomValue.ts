import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator'

export const getGameCode = (): string => {
  const customConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: '-',
    length: 3
  }

  const shortCode: string = uniqueNamesGenerator(customConfig)

  return shortCode
}
