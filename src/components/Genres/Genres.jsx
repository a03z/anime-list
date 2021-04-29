import axios from 'axios'
import './genres.css'
import React, { useEffect, useState } from 'react'

export const Genres = (props) => {
    const [genres, setGenres] = useState([])

    const getGenreList = async (subtype) => {
        const res = await axios.get(`https://api.jikan.moe/v4/genres/anime`)
        props.setRequestType('genre')
        setGenres(res.data.data)
    }

    useEffect(() => {
        getGenreList()
    }, [])

    return (
        <div className="genres">
            <span>Genres</span>
            {genres.map((el) => (
                <button
                    onClick={() => {
                        props.getAnimeList('', 'genre', el.mal_id)
                    }}
                    key={el.mal_id}
                >
                    {el.name}
                </button>
            ))}
        </div>
    )
}
