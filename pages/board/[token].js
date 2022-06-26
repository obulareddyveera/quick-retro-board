import React from 'react';
import Head from 'next/head'

import { ServiceProvider } from '../../src/context';
import BoardContainer from '../../src/containers/board';
const Board = (props) => {
    return (
        <div className="container">
          <Head>
            <title>Quick Retro Board</title>
            <meta name="description" content="Quick Retro Board" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <main className='w-screen h-screen'>
            <ServiceProvider>
                <BoardContainer {...props} />
            </ServiceProvider>
          </main>
    
        </div>
      )
}

export async function getServerSideProps({params, req, res }) {
    const { token } = params;
    const requestOptions = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };
    const category =  await fetch('http://localhost:3000/api/category', requestOptions).then(response => response.json());
    console.log('--== 3 getServerSideProps ', category);
    return {
      props: {category},
    }
  }

export default Board;