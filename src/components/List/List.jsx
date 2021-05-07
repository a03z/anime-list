/* eslint-disable react/prop-types */
import React from 'react'
import { Pagination } from '../Pagination/Pagination'
import s from './list.module.scss'

export let List = props => (
	<>
		<Pagination
			page={props.page}
			prevPage={props.prevPage}
			nextPage={props.nextPage}
		/>
		<div className={s.container}>
			{props.list.map(el => (
				<a
					href={el.url}
					key={el.mal_id}
					className={s.card}
					target='_blank'
					rel='noreferrer'
				>
					<h2>{el.title}</h2>

					<img src={el.image_url} alt={`${el.title} image`} />
					<div className={s.cardInfo}>
						<span className={s.cardScore}>Rating: {el.score}</span>
					</div>
				</a>
			))}
		</div>
	</>
)
