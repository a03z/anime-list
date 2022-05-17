import React from 'react'
import { useNavigate } from 'react-router-dom'
import { effectTypeChanged, titleChanged } from '../../entities/store/effector'
import {
	getAnimeListFx,
	pageChanged,
	subtypeChanged,
} from '../../pages/List/model'

import s from './sort.module.scss'

export const Sort = () => {
	const navigate = useNavigate()
	const getSorted = (subtype, title) => {
		pageChanged(1)
		subtypeChanged(subtype)
		effectTypeChanged('getAnime')
		navigate('/')
		titleChanged(title)
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
			<button className='btn' onClick={getByRating}>
				Rating
			</button>
			<button className='btn' onClick={getByPopularity}>
				Popularity
			</button>
			<button className='btn' onClick={getFavorite}>
				Favorite
			</button>
			<button className='btn' onClick={getAiring}>
				Airing
			</button>
			<button className='btn' onClick={getUpcoming}>
				Upcoming
			</button>
			<button className='btn' onClick={getTv}>
				Tv
			</button>
			<button className='btn' onClick={getMovie}>
				Movie
			</button>
			<button className='btn' onClick={getOva}>
				Ova
			</button>
			<button className='btn' onClick={getSpecial}>
				Special
			</button>
		</div>
	)
}
