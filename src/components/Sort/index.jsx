import React from 'react'
import { useHistory } from 'react-router'
import {
	getAnimeListFx,
	setEffectType,
	setPage,
	setSubtype,
	setTitle,
} from '../../entities/store/effector'
import s from './sort.module.scss'

export const Sort = () => {
	const history = useHistory()
	const getSorted = (subtype, title) => {
		setPage(1)
		setSubtype(subtype)
		setEffectType('getAnime')
		history.push('/')
		setTitle(title)
		getAnimeListFx()
	}

	const getByRating = () => {
		getSorted('', 'Rating')
	}
	const getByPopularity = () => {
		getSorted('/bypopularity', 'Popularity')
	}

	const getFavorite = () => {
		getSorted('/favorite', 'Favorite')
	}

	const getAiring = () => {
		getSorted('/airing', 'Airing')
	}

	const getUpcoming = () => {
		getSorted('/upcoming', 'Upcoming')
	}

	const getTv = () => {
		getSorted('/tv', 'TV')
	}

	const getMovie = () => {
		getSorted('/movie', 'Movie')
	}

	const getOva = () => {
		getSorted('/ova', 'OVA')
	}

	const getSpecial = () => {
		getSorted('/special', 'Special')
	}

	return (
		<div className={s.sort}>
			<span>Sort by</span>
			<button onClick={getByRating}>Rating</button>
			<button onClick={getByPopularity}>Popularity</button>
			<button onClick={getFavorite}>Favorite</button>
			<button onClick={getAiring}>Airing</button>
			<button onClick={getUpcoming}>Upcoming</button>
			<button onClick={getTv}>Tv</button>
			<button onClick={getMovie}>Movie</button>
			<button onClick={getOva}>Ova</button>
			<button onClick={getSpecial}>Special</button>
		</div>
	)
}
