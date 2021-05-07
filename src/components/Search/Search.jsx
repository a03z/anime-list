import React from 'react'
import s from './search.module.scss'
import { useForm } from 'react-hook-form'
import { searchAnimeListFx, setSearchText } from '../../store/effector'
import { ExclamationCircleIcon, SearchIcon } from '@heroicons/react/outline'

export const Search = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	let onSubmit = data => {
		setSearchText(data.searchAnime)
		searchAnimeListFx()
	}
	return (
		<>
			<form className={s.search} onSubmit={handleSubmit(onSubmit)}>
				<div className={s.searchContainer}>
					<input
						className={s.searchInput}
						{...register('searchAnime', { required: true })}
						placeholder='Search...'
					/>

					{errors.searchAnime && (
						<a title='this field is required'>
							<span
								title='This field is required'
								className={s.errorSpan}
							>
								<ExclamationCircleIcon
									className={s.errorSpanIcon}
								/>
							</span>
						</a>
					)}

					<button type='submit' className={s.searchBtn}>
						<SearchIcon className={s.searchIcon} />
					</button>
				</div>
			</form>
		</>
	)
}
