import { render } from '@testing-library/react'
import HeaderSeo from 'components/Seo/HeaderSeo'

// I use this guide to test head: https://github.com/vercel/next.js/discussions/11060#discussioncomment-33628
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    }
  }
})

describe('the <HeaderSeo /> component', () => {
  test('should render the meta tags with content specified', () => {
    const seoTags = {
      title: 'Playing on Room funny-game',
      content: 'Enjoy the game with your friends'
    }

    render(<HeaderSeo {...seoTags} />, { container: document.head })
    expect(document.title).toBe(seoTags.title)
    expect(document.getElementsByTagName('meta')[0].getAttribute('content')).toBe(seoTags.content)
  })
})
