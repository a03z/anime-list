import React from 'react'
import s from './search.module.scss'
import { useForm } from 'react-hook-form'
import { searchAnimeListFx, setSearchText } from '../../store/effector'

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
				<input
					className={s.searchInput}
					{...register('searchAnime')}
					placeholder='Search...'
				/>

				{errors.searchAnime && <span>This field is required</span>}

				<input type='submit' />
			</form>
		</>
	)
}
