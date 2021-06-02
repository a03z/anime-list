import React from 'react'
import { useHistory } from 'react-router'
import { getAnimeListFx, setEffectType, setPage, setSubtype } from '../../store/effector'
import s from './sort.module.scss'

export const Sort = () => {
	const history = useHistory()
	const getSorted = subtype => {
		setPage(1)
		setSubtype(subtype)
		setEffectType('getAnime')
		history.push('/')
		getAnimeListFx()
	}

	const getByRating = () => {
		getSorted('')
	}
	const getByPopularity = () => {
		getSorted('/bypopularity')
	}

	const getFavorite = () => {
		getSorted('/favorite')
	}

	const getAiring = () => {
		getSorted('/airing')
	}

	const getUpcoming = () => {
		getSorted('/upcoming')
	}

	const getTv = () => {
		getSorted('/tv')
	}

	const getMovie = () => {
		getSorted('/movie')
	}

	const getOva = () => {
		getSorted('/ova')
	}

	const getSpecial = () => {
		getSorted('/special')
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
