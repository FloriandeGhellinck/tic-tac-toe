import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>TIC TAC TOE </title>
        <meta
          name='description'
          content='Tic Tac Toe Created by Florian de Ghellinck'
        />
        <link
          rel='icon'
          href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 15 50 90%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>'
        />
      </Head>

      <main>
        <div className='w-full h-screen bg-black'>
          <h1 className='text-red-600 underline'> PROJECT IN PROGRESS</h1>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
