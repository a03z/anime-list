import React from 'react'
import { useNavigate } from 'react-router-dom'
import { effectTypeChanged, titleChanged } from '../../entities/store/effector'
import {
	getAnimeListFx,
	pageChanged,
	subtypeChanged,
} from '../../pages/List/model'
import { sortButtons } from './const'

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
		// changes
	}

	return (
		<div className={s.sort}>
			<span>Sort by</span>
			{sortButtons.map((btn) => {
				return (
					<button
						className='btn'
						onClick={() => {
							getSorted(btn.subtitle, btn.title)
						}}>
						{btn.title}
					</button>
				)
			})}
		</div>
	)
}
