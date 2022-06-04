import Image from 'next/image'
import { SimpleGrid, Text, Flex, Stack, StackProps, Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { Category } from 'types/quiz'
import config from 'config/game'
import { useStep } from 'context/StepContext'
import { PreviousIc } from 'components/Icons'

export const MotionStack = motion<StackProps>(Stack)

type Props = {
  id: number
  name: string
  icon: string
}

const Category = ({ id, name, icon }: Props) => {
  return (
    <MotionStack
      as='button'
      borderRadius='15px'
      padding='6px'
      align='center'
      justify='center'
      whileHover={{ scale: 1.1 }}
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

const CategoryPanel = () => {
  const { step, hidePanelCategory } = useStep()
  const { category } = step
  // console.log(mode)
  if (!category) return null

  return (
    <Flex direction='column' gap={6}>
      <Text
        fontWeight='bold'
        fontSize={{
          base: '2xl',
          md: '5xl'
        }}
        color='blue.400'
        mb={8}
      >
        Choose Category
      </Text>
      <SimpleGrid mb='28px' columns={{ base: 2, md: 4 }} spacing={5}>
        {config.categories.map((category: Category) => (
          <Category key={category.id} {...category} />
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
        <Button w='auto' bg='blue.400' color='white' float='right' textTransform='uppercase'>
          start
        </Button>
      </Flex>
    </Flex>
  )
}

export default CategoryPanel
