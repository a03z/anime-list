/* eslint-disable react/prop-types */
import React from 'react'
import { setPage, setSubtype } from '../../store/effector'
import s from './sort.module.scss'

export const Sort = props => {
	const getByRating = () => {
		setPage(1)
		setSubtype('')
		props.getAnimeListFx()
	}
	const getByPopularity = () => {
		setPage(1)
		setSubtype('/bypopularity')
		props.getAnimeListFx()
	}

	const getFavorite = () => {
		setPage(1)
		setSubtype('/favorite')
		props.getAnimeListFx()
	}

	const getAiring = () => {
		setPage(1)
		setSubtype('/airing')
		props.getAnimeListFx()
	}

	const getUpcoming = () => {
		setPage(1)
		setSubtype('/upcoming')
		props.getAnimeListFx()
	}

	const getTv = () => {
		setPage(1)
		setSubtype('/tv')
		props.getAnimeListFx()
	}

	const getMovie = () => {
		setPage(1)
		setSubtype('/movie')
		props.getAnimeListFx()
	}

	const getOva = () => {
		setPage(1)
		setSubtype('/ova')
		props.getAnimeListFx()
	}

	const getSpecial = () => {
		setPage(1)
		setSubtype('/special')
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
