import React from 'react'
import './sort.css'

export const Sort = (props) => {
    const getByRating = () => {
        props.getAnimeList('')
    }
    const getByPopularity = () => {
        props.getAnimeList('/bypopularity')
    }

    const getFavorite = () => {
        props.getAnimeList('/favorite')
    }

    const getAiring = () => {
        props.getAnimeList('/airing')
    }

    const getUpcoming = () => {
        props.getAnimeList('/upcoming')
    }

    const getTv = () => {
        props.getAnimeList('/tv')
    }

    const getMovie = () => {
        props.getAnimeList('/movie')
    }

    const getOva = () => {
        props.getAnimeList('/ova')
    }

    const getSpecial = () => {
        props.getAnimeList('/special')
    }

    return (
        <div className="sort">
            <span>Sort by</span>
            <button onClick={getByRating}>Rating</button>
            <button onClick={getByPopularity}>Popularity</button>
            <button onClick={getFavorite}>Favorite</button>
            <button onClick={getAiring}>Airing</button>
            <button onClick={getTv}>Tv</button>
            <button onClick={getMovie}>Movie</button>
            <button onClick={getOva}>Ova</button>
            <button onClick={getSpecial}>Special</button>
        </div>
    )
}
