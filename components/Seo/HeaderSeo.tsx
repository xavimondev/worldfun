import Head from 'next/head'

type Props = {
  title: string
  content: string
}

const HeaderSeo = ({ title, content }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={content} />
    </Head>
  )
}

export default HeaderSeo
