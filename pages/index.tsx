import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMoviesList from "@/hooks/useMoviesList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

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
  const { data: movies = [] } = useMoviesList()
  const { data: favorites = [] } = useFavorites()

  const { isOpen, closeModal } = useInfoModal()

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40" >
        <MovieList data={movies} title="Trending Now" />
        <MovieList data={favorites} title="My List" />
      </div>
    </>
  )
}
