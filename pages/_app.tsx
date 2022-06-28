import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AuthProvider } from 'context/AuthContext'
import { GameProvider } from 'context/GameContext'
import { StepProvider } from 'context/StepContext'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ config })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <StepProvider>
          <GameProvider>
            <Component {...pageProps} />
          </GameProvider>
        </StepProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
