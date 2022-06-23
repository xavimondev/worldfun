import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AuthProvider } from 'context/AuthContext'
import { GameProvider } from 'context/GameContext'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ config })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <GameProvider>
          <Component {...pageProps} />
        </GameProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
