import Head from 'next/head'
import { Inter } from '@next/font/google'
import NavBar from '@/components/nav/navbar'
import Banner from '@/components/banner/banner'
import SectionCards from '@/components/sectioncards/sectioncards'
import {fetchMovies} from '@/lib/movies'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps()
{
 const topRatedMovies = await fetchMovies('top_rated', 1);
 const popularMovies = await fetchMovies('popular', 2);
 const upcomingMovies = await fetchMovies('upcoming', 3);
 const nowPlayingMovies = await fetchMovies('now_playing', 20);

  return {
    props:
    {
      topRatedMovies,
      popularMovies,
      upcomingMovies,
      nowPlayingMovies,
    },
  }
};


export default function Home(
{
  topRatedMovies,
  popularMovies, 
  upcomingMovies, 
  nowPlayingMovies
}) 
{
  return (
    <>
      <Head>
        <title>Movies</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/icon.png"/>
      </Head>
      <NavBar/>
      <Banner movies={popularMovies[2]}/>
      <SectionCards movies={topRatedMovies} title='TopRated' size='medium'/>
      <SectionCards movies={popularMovies} title='Popular' size='large'/>
      <SectionCards movies={upcomingMovies} title='UpComing' size='small'/>
      <SectionCards movies={nowPlayingMovies} title='NowPlaying' size='medium'/>
    </>
  )
}
