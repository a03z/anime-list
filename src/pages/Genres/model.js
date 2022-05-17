import axios from 'axios'
import { createEffect, createEvent, restore } from 'effector'

export const genreChanged = createEvent()

export const getGenreListFx = createEffect(async () => {
	const res = await axios.get(`https://api.jikan.moe/v4/genres/anime`)
	return res.data.data
})

export const $genres = restore(getGenreListFx, [])
export const $genre = restore(genreChanged, '')
