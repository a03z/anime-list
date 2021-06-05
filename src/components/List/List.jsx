import React from 'react'
import { NavLink } from 'react-router-dom'
import { getExactAnimeFx } from '../../entities/store/effector'
import { Pagination } from '../Pagination/Pagination'
import s from './list.module.scss'

export const List = props => (
	<>
		<Pagination page={props.page} prevPage={props.prevPage} nextPage={props.nextPage} />
		<div className={s.container}>
			{props.list.map(el => (
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
			))}
		</div>
	</>
)
