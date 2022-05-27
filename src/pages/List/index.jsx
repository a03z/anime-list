import React from 'react'
import s from './list.module.scss'
import { useList, useStore } from 'effector-react'
import { NavLink } from 'react-router-dom'
import { Pagination } from '../../components/Pagination'
import { $page, getAnimeListFx, nextPageE, prevPageE } from './model'
import { $effectType, $list } from '../../entities/store/effector'
import { searchAnimeListFx } from '../Search/model'
import { getExactAnimeFx } from '../AnimePage/model'

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
