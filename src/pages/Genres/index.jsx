import s from './genres.module.scss'
import React, { useEffect } from 'react'
import { useList } from 'effector-react'
import {
	$genres,
	getAnimeListFx,
	getGenreListFx,
	setEffectType,
	setGenre,
	setPage,
	setRequestType,
	setTitle,
} from '../../entities/store/effector'

export const Genres = () => {
	const genres = useList($genres, el => (
		<button
			onClick={() => {
				setPage(1)
				setRequestType('genre')
				setGenre(`/${el.mal_id}`)
				getAnimeListFx()
			}}
			key={el.mal_id}>
			{el.name}
		</button>
	))

	useEffect(() => {
		setEffectType('getAnime')
		getGenreListFx()
		setTitle('Genres')
	}, [])

	return (
		<div className={s.genres}>
			<span>Genres</span>
			{genres}
		</div>
	)
}
