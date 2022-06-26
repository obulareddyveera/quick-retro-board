import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ backgroundImage: 'radial-gradient(hsla(var(--bc)/.2) 0.5px,hsla(var(--b2)/1) 0.5px)' }}>
      <Component {...pageProps} />
    </div>)
}

export default MyApp
