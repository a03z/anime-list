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
