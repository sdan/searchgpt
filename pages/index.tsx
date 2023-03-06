import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>SearchGPT</title>
        <meta name="description" content="SearchGPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by adding&nbsp;
            <code className={styles.code}>https://searchgpt.vercel.app/?q=%s</code> as a custom search engine in your browser. 
          </p>

        </div>


      </main>
    </>
  )
}
