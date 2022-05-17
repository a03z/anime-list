import React, { useEffect } from 'react'
import s from './search.module.scss'
import { useForm } from 'react-hook-form'
import { ExclamationCircleIcon, SearchIcon } from '@heroicons/react/outline'
import { searchAnimeListFx, searchTextChanged } from './model'
import { effectTypeChanged, titleChanged } from '../../entities/store/effector'
import { useNavigate } from 'react-router-dom'

export const Search = () => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	let onSubmit = (data) => {
		searchTextChanged(data.searchAnime)
		effectTypeChanged('searchAnime')
		searchAnimeListFx()
		navigate('/')
	}

	useEffect(() => {
		titleChanged('Search...')
	}, [])
	return (
		<>
			<form
				autoComplete='off'
				className={s.search}
				onSubmit={handleSubmit(onSubmit)}>
				<div className={s.searchContainer}>
					<input
						className={s.searchInput}
						{...register('searchAnime', { required: true })}
						placeholder='Search...'
					/>

					{errors.searchAnime && (
						<>
							<span className={s.errorSpan}>
								<ExclamationCircleIcon
									className={s.errorSpanIcon}
								/>
								<div className={s.errorPopup}>
									This field is required.
								</div>
							</span>
						</>
					)}

					<button type='submit' className={s.searchBtn}>
						<SearchIcon className={s.searchIcon} />
					</button>
				</div>
			</form>
		</>
	)
}
