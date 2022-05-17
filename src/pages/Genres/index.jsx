import s from './genres.module.scss'
import React, { useEffect } from 'react'
import { useList } from 'effector-react'
import { $genres, getGenreListFx, genreChanged } from './model'
import { getAnimeListFx, pageChanged, requestTypeChanged } from '../List/model'
import { effectTypeChanged, titleChanged } from '../../entities/store/effector'

export const Genres = () => {
	const genres = useList($genres, (el) => (
		<button
			onClick={() => {
				pageChanged(1)
				requestTypeChanged('genre')
				genreChanged(`/${el.mal_id}`)
				getAnimeListFx()
			}}
			className='btn'
			key={el.mal_id}>
			{el.name}
		</button>
	))

	useEffect(() => {
		effectTypeChanged('getAnime')
		getGenreListFx()
		titleChanged('Genres')
	}, [])

	return (
		<div className={s.genres}>
			<span>Genres</span>
			{genres}
		</div>
	)
}
