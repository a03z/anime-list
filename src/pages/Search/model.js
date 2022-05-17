import axios from 'axios'
import { attach, combine, createEffect, createEvent, restore } from 'effector'
import { $page } from '../List/model'

export const searchTextChanged = createEvent()

const searchAnimeListFxBase = createEffect()
// поиск аниме
export const $searchText = restore(searchTextChanged, '')

searchAnimeListFxBase.use(async ({ page, searchText }) => {
	const res = await axios.get(
		`https://api.jikan.moe/v3/search/anime?q=${searchText}&page=${page}`
	)
	return res.data.results
})
export const searchAnimeListFx = attach({
	source: combine({
		searchText: $searchText,
		page: $page,
	}),
	mapParams: (params, source) => source,
	effect: searchAnimeListFxBase,
})
