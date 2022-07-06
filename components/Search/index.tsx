import React, { useCallback, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'
import debounce from 'just-debounce-it'
import { Room } from 'types/room'
import { filterRoomsByCode } from 'services/room'
import SearchForm from './Form'
import ListRooms from './ListRooms'

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [listRooms, setListRooms] = useState<Room[]>([])

  const autocompleteDebounce = useCallback(
    debounce(async () => {
      const q = inputRef.current?.value
      const results = await filterRoomsByCode(q!)
      // console.log(results)
      results && setListRooms(results)
    }, 250),
    []
  )

  // const setValue = (channelSelected: string) => {
  //   inputRef.current!.value = channelSelected
  // }

  const getValue = () => inputRef.current?.value
  const handleSearch = () => {
    const q = getValue()
    if (!q) {
      // Clear results because user has cleared the input
      setListRooms([])
      return
    }

    autocompleteDebounce()
  }

  return (
    <Box width='full'>
      <SearchForm inputRef={inputRef} handleSearch={handleSearch} />
      {listRooms.length > 0 && <ListRooms listRooms={listRooms} />}
    </Box>
  )
}

export default Search
