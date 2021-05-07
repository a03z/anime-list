/* eslint-disable react/prop-types */
import axios from 'axios'
import s from './genres.module.scss'
import React, { useEffect, useState } from 'react'
import { setGenre } from './../../store/effector'

export const Genres = props => {
	const [genres, setGenres] = useState([])

	const getGenreList = async () => {
		const res = await axios.get(`https://api.jikan.moe/v4/genres/anime`)
		props.setRequestType('genre')
		setGenres(res.data.data)
	}

	useEffect(() => {
		getGenreList()
	}, [])

	return (
		<div className={s.genres}>
			<span>Genres</span>
			{genres.map(el => (
				<button
					onClick={() => {
						setGenre(`/${el.mal_id}`)
						props.getAnimeListFx()
					}}
					key={el.mal_id}
				>
					{el.name}
				</button>
			))}
		</div>
	)
}
