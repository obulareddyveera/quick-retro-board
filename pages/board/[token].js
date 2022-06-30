import React, { useEffect } from 'react';
import Head from 'next/head'
import jwt from 'jsonwebtoken';

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

export async function getServerSideProps({ params, req, res }) {
  const { token } = params;
  if (token && token !== 'undefined') {
    const requestOptions = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = {
      category: await fetch(`${process.env.HOST_NAME}/api/metadata/category`, requestOptions).then(response => response.json()),
    }
    response.retros = jwt.decode(token);
    if (response.retros && response.retros.id) {
      response.token = token;
      response.users = await fetch(`${process.env.HOST_NAME}/api/users?retrosId=${response.retros.id}`, requestOptions).then(response => response.json())
    }
    return {
      props: response,
    }
  }

  return {
    props: {},
  }
}

export default Board;