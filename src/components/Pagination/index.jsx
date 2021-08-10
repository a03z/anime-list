import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import s from './pagination.module.scss'

export const Pagination = props => {
	return (
		<div className={s.pagination}>
			<button className={s.changePage} onClick={props.prevPage}>
				<ChevronLeftIcon />
			</button>
			{props.page}
			<button className={s.changePage} onClick={props.nextPage}>
				<ChevronRightIcon />
			</button>
		</div>
	)
}
