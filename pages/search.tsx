// write a search page in typescript that uses the search query to fetch data from the API and display it in a list.
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
// import { Search } from '@/components/Search'
// import { SearchResult } from '@/components/SearchResult'
// import { SearchResponse } from '@/types/SearchResponse'

const inter = Inter({ subsets: ['latin'] })

export default function SearchPage() {

    function formatText(text: any) {
        if (!text) {
          return null;
        }
        const lines = text.split("\n");
        return lines.map((line: any, index: any) => <p key={index}>{line}</p>);
      }


  const router = useRouter()
//   const [results, setResults] = useState<SearchResponse>(null)
  const [results, setResults] = useState(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const search = async (q: string) => {
    setIsLoading(true)
    try {
        const searchresultsapi = await fetch('/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q }),
          });

        const data = await searchresultsapi.json()



    
        console.log("frontend getting openai", data)

      setResults(data.text)
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (router.query.q && typeof router.query.q === 'string') {
      search(router.query.q)
      console.log("search query", router.query.q)
    }
  }, [router.query.q])

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }


  return (
    <>
      <Head>
        <title>Searchgpt.xyz</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          {/* <p>
            Get started by adding&nbsp;
            <code className={styles.code}>searchgpt.xyz/?q=%s</code> to your browser's search bar. 
          </p> */}

          <div>
          <p>
            <b>Search query: {router.query.q}</b>
          </p>

          {isLoading ? (
            <p>
           Loading...
          </p>
          ) : (
 
            <div style={{ whiteSpace: "pre-wrap" }}>
           {formatText(results)}
          </div>        
          )}
        </div>
    
        </div>



        </main>
    </>
    )
}

