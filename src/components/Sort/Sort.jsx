import React from 'react'
import './sort.css'

export const Sort = (props) => {
    const getByRating = () => {
        props.getAnimeList('', 'top')
    }
    const getByPopularity = () => {
        props.getAnimeList('/bypopularity', 'top')
    }

    const getFavorite = () => {
        props.getAnimeList('/favorite', 'top')
    }

    const getAiring = () => {
        props.getAnimeList('/airing', 'top')
    }

    const getUpcoming = () => {
        props.getAnimeList('/upcoming', 'top')
    }

    const getTv = () => {
        props.getAnimeList('/tv', 'top')
    }

    const getMovie = () => {
        props.getAnimeList('/movie', 'top')
    }

    const getOva = () => {
        props.getAnimeList('/ova', 'top')
    }

    const getSpecial = () => {
        props.getAnimeList('/special', 'top')
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
