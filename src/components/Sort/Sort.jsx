/* eslint-disable react/prop-types */
import React from 'react'
import { setEffectType, setPage, setSubtype } from '../../store/effector'
import s from './sort.module.scss'

export const Sort = props => {
	const getByRating = () => {
		setPage(1)
		setSubtype('')
		setEffectType('getAnime')
		props.getAnimeListFx()
	}
	const getByPopularity = () => {
		setPage(1)
		setSubtype('/bypopularity')
		setEffectType('getAnime')
		props.getAnimeListFx()
	}

	const getFavorite = () => {
		setPage(1)
		setSubtype('/favorite')
		setEffectType('getAnime')
		props.getAnimeListFx()
	}

	const getAiring = () => {
		setPage(1)
		setSubtype('/airing')
		setEffectType('getAnime')
		props.getAnimeListFx()
	}

	const getUpcoming = () => {
		setPage(1)
		setSubtype('/upcoming')
		setEffectType('getAnime')
		props.getAnimeListFx()
	}

	const getTv = () => {
		setPage(1)
		setSubtype('/tv')
		setEffectType('getAnime')
		props.getAnimeListFx()
	}

	const getMovie = () => {
		setPage(1)
		setSubtype('/movie')
		setEffectType('getAnime')
		props.getAnimeListFx()
	}

	const getOva = () => {
		setPage(1)
		setSubtype('/ova')
		setEffectType('getAnime')
		props.getAnimeListFx()
	}

	const getSpecial = () => {
		setPage(1)
		setSubtype('/special')
		setEffectType('getAnime')
		props.getAnimeListFx()
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
