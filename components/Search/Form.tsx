import { Input, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react'
import { SearchIc } from 'components/Icons'

type Props = {
  inputRef: React.RefObject<HTMLInputElement>
  handleSearch: () => void
}

const SearchForm = ({ inputRef, handleSearch }: Props) => {
  const bg = useColorModeValue('blue.400', '#181b29')

  return (
    <>
      <form>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <SearchIc />
          </InputLeftElement>
          <Input
            w='full'
            bg={bg}
            type='search'
            name='email'
            border='none'
            placeholder='Paste game code here'
            ref={inputRef}
            onChange={handleSearch}
          />
        </InputGroup>
      </form>
    </>
  )
}
export default SearchForm
