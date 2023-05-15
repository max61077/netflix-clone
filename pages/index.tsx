import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMoviesList from "@/hooks/useMoviesList";

export async function getServerSideProps(context: NextPageContext) {
  try {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false
        }
      }
    }

    return {
      props: {}
    }

  } catch (error) {

  }
}

export default function Home() {
  const { data: movies, isLoading } = useMoviesList()

  return (
    <>
      <Navbar/>
      <Billboard/>
      <div className="pb-40" >
        <MovieList data={movies} title="Trending Now" />
      </div>
    </>
  )
}
