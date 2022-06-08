import { useState } from 'react'
import Image from 'next/image'
import {
  SimpleGrid,
  Text,
  Flex,
  Stack,
  StackProps,
  Button,
  Heading,
  BoxProps,
  Box
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

import { Category, Preferences } from 'types/quiz'
import config from 'config/game'
import { useStep } from 'context/StepContext'
import { PreviousIc } from 'components/Icons'
import { useRouter } from 'next/router'
import useLocalStorage from 'hooks/useLocalStorage'

export const MotionStack = motion<StackProps>(Stack)

type Props = {
  id: number
  name: string
  icon: string
  setCategory: VoidFunction
  isSelected: boolean
}

const Category = ({ name, icon, setCategory, isSelected }: Props) => {
  const borderColor = isSelected ? '#12c69d' : '#ccd0d5'
  const backgroundColor = isSelected ? 'rgba(144, 205, 244, 0.20)' : ''

  return (
    <MotionStack
      as='button'
      borderRadius='15px'
      padding='10px'
      align='center'
      justify='center'
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      whileHover={{ scale: 1.1 }}
      onClick={setCategory}
    >
      <Flex mb={1}>
        <Image src={icon} alt={name} width='30' height='30' />
      </Flex>
      <Text fontWeight={600} color='white'>
        {name}
      </Text>
    </MotionStack>
  )
}

export const MotionBox = motion<BoxProps>(Box)

const initialValue: Preferences = {
  idCategory: 1,
  mode: 'alone',
  difficulty: 'easy'
}

const CategoryPanel = () => {
  const router = useRouter()
  const [isDisabled, setDisabled] = useState(true)
  const [, setValue] = useLocalStorage<Preferences>('triviafun:preferences', initialValue)

  const { step, hidePanelCategory, preferences, setPreferences } = useStep()
  const { category } = step
  if (!category) return null

  const startGame = () => {
    console.log(preferences)
    setValue(preferences)
    router.push(
      {
        pathname: '/game/funny-random-id',
        query: {
          idCategory: preferences.idCategory,
          difficulty: preferences.difficulty
        }
      },
      undefined,
      { shallow: true }
    )
  }

  const selectCategory = (idCategory: number) => {
    setPreferences((prevPreferences: Preferences) => ({ ...prevPreferences, idCategory }))
    setDisabled(false)
  }

  return (
    <AnimatePresence>
      <MotionBox initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Flex direction='column' gap={6}>
          <Heading
            fontWeight='bold'
            fontSize={{
              base: '2xl',
              md: '5xl'
            }}
            color='blue.400'
            mb={8}
          >
            Choose Category
          </Heading>
          <SimpleGrid mb='28px' columns={{ base: 2, md: 4 }} spacing={5}>
            {config.categories.map((category: Category) => (
              <Category
                key={category.id}
                {...category}
                setCategory={() => selectCategory(category.id)}
                isSelected={category.id === preferences.idCategory}
              />
            ))}
          </SimpleGrid>
          <Flex direction='row' justifyContent='space-between'>
            <Button
              w='auto'
              bg='blue.400'
              color='white'
              float='right'
              leftIcon={<PreviousIc />}
              onClick={hidePanelCategory}
              textTransform='uppercase'
            >
              previous
            </Button>
            <Button
              w='auto'
              bg='blue.400'
              color='white'
              float='right'
              textTransform='uppercase'
              onClick={startGame}
              isDisabled={isDisabled}
            >
              start
            </Button>
          </Flex>
        </Flex>
      </MotionBox>
    </AnimatePresence>
  )
}

export default CategoryPanel
