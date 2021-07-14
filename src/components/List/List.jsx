import { useList, useStore } from 'effector-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import {
	$effectType,
	$list,
	$page,
	getAnimeListFx,
	getExactAnimeFx,
	nextPageE,
	prevPageE,
	searchAnimeListFx,
} from '../../entities/store/effector'
import { Pagination } from '../Pagination/Pagination'
import s from './list.module.scss'

export const List = () => {
	let page = useStore($page)
	let effectType = useStore($effectType)

	const nextPage = () => {
		nextPageE()
		effectType === 'getAnime' ? getAnimeListFx() : searchAnimeListFx()
	}

	const prevPage = () => {
		prevPageE()
		if (page === 1) {
			return
		} else {
			effectType === 'getAnime' ? getAnimeListFx() : searchAnimeListFx()
		}
	}

	const list = useList($list, (el) => {
		return (
			<NavLink
				href={el.url}
				key={el.mal_id}
				className={s.card}
				rel='noreferrer'
				to={`/anime/${el.mal_id}`}
				onClick={() => {
					getExactAnimeFx()
				}}>
				<h2>{el.title}</h2>

				<img src={el.image_url} alt={`${el.title} image`} />
				<div className={s.cardInfo}>
					<span className={s.cardScore}>Rating: {el.score}</span>
				</div>
			</NavLink>
		)
	})
	return (
		<>
			<Pagination page={page} prevPage={prevPage} nextPage={nextPage} />
			<div className={s.container}>{list}</div>
		</>
	)
}
