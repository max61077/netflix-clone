import React, { useCallback, useMemo } from 'react'
import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'
import { AiOutlinePlusCircle, AiOutlineCheckCircle } from 'react-icons/ai'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { NextPageContext } from 'next'

interface FavoriteButtonProps {
    movieId: string
}

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

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites()
    const { data: currentUser, mutate: mutateUser } = useCurrentUser()

    const isFavorite: boolean = useMemo(() => {
        const list = currentUser.favouriteIds || []

        return list.includes(movieId)
    }, [currentUser, movieId])

    const toggleFavorites = useCallback(async () => {
        let response;

        if (isFavorite) {
            response = await axios.delete('/api/favorite', { data: { movieId } })
        } else {
            response = await axios.post('/api/favorite', { movieId })
        }

        const updateFavoriteIds = response?.data?.favoriteIds

        mutateUser({
            ...currentUser,
            favoriteIds: updateFavoriteIds
        })

        mutateFavorites()

    }, [movieId, isFavorite, currentUser, mutateUser, mutateFavorites])

    const Icon = isFavorite ? AiOutlineCheckCircle : AiOutlinePlusCircle

    return (
        <div
            onClick={toggleFavorites}
            className='
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        border-white
        flex
        justify-center
        items-center
        transition
        hover:border-neutral-300
        ' >
            <Icon className='text-white' size={50} />
        </div>
    )
}

export default FavoriteButton