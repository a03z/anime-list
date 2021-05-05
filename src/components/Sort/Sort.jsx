/* eslint-disable react/prop-types */
import React from 'react'
import { setSubtype } from '../../store/effector'
import './sort.css'

export const Sort = props => {
	const getByRating = () => {
		setSubtype('/rating')
		props.getAnimeListFx()
	}
	const getByPopularity = () => {
		setSubtype('/bypopularity')
		props.getAnimeListFx()
	}

	const getFavorite = () => {
		setSubtype('/favorite')
		props.getAnimeListFx()
	}

	const getAiring = () => {
		setSubtype('/airing')
		props.getAnimeListFx()
	}

	const getUpcoming = () => {
		setSubtype('/upcoming')
		props.getAnimeListFx()
	}

	const getTv = () => {
		setSubtype('/tv')
		props.getAnimeListFx()
	}

	const getMovie = () => {
		setSubtype('/movie')
		props.getAnimeListFx()
	}

	const getOva = () => {
		setSubtype('/ova')
		props.getAnimeListFx()
	}

	const getSpecial = () => {
		setSubtype('/special')
		props.getAnimeListFx()
	}

	return (
		<div className='sort'>
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
