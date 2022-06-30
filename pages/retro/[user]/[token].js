import Head from 'next/head'
import jwt from 'jsonwebtoken';

import RetrosContainer from '../../../src/containers/retros';
import { ServiceProvider } from '../../../src/context';

export default function Retro(props) {
    return (
        <div className="container">
            <Head>
                <title>Quick Retro Board</title>
                <meta name="description" content="Quick Retro Board" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className='w-screen h-screen'>
                <ServiceProvider>
                    <RetrosContainer {...props} />
                </ServiceProvider>
            </main>

        </div>
    )
}


export async function getServerSideProps({ params, req, res }) {
    const { token, user } = params;
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
        response.user = await fetch(`${process.env.HOST_NAME}/api/users?usersId=${user}`, requestOptions).then(response => response.json())
      }
      return {
        props: response,
      }
    }
  
    return {
      props: {},
    }
  }