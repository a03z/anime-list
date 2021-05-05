import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import './pagination.css'

export const Pagination = (props) => {
	return (
		<div className='pagination'>
			<button className='changePage' onClick={props.prevPage}>
				<ChevronLeftIcon />
			</button>
			{props.page}
			<button className='changePage' onClick={props.nextPage}>
				<ChevronRightIcon />
			</button>
		</div>
	)
}
