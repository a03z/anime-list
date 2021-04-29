import axios from 'axios'
import './genres.css'
import React, { useEffect, useState } from 'react'

export const Genres = () => {
    const [genres, setGenres] = useState([])

    const getGenreList = async (subtype) => {
        const res = await axios.get(`https://api.jikan.moe/v4/genres/anime`)
        setGenres(res.data.data)
    }

    const getGenre = async (genreId) => {
        const res = await axios.get(
            `https://api.jikan.moe/v3/genre/anime/${genre_id}`
        )
    }

    useEffect(() => {
        getGenreList()
    }, [])

    return (
        <div className="genres">
            <span>Genres</span>
            {genres.map((el) => (
                <button key={el.mal_id}>{el.name}</button>
            ))}
        </div>
    )
}
