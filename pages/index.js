import Head from 'next/head'

import HomeContainer from '../src/containers/home';
import { ServiceProvider } from '../src/context';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Quick Retro Board</title>
        <meta name="description" content="Quick Retro Board" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='w-screen h-screen'>
        <ServiceProvider>
          <HomeContainer />
        </ServiceProvider>
      </main>

    </div>
  )
}
