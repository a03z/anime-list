import axios from 'axios'
import {
	attach,
	combine,
	createApi,
	createEffect,
	createEvent,
	createStore,
	restore,
} from 'effector'
import { $genre, genreChanged } from '../Genres/model'

// events
export const requestTypeChanged = createEvent()
export const pageChanged = createEvent()
export const subtypeChanged = createEvent()

// effects
const getAnimeListBaseFx = createEffect()

// stores
export const $page = restore(pageChanged, 1)
export const $requestType = restore(requestTypeChanged, 'top')
export const $subtype = createStore('').on(subtypeChanged, (_, subtype) => {
	requestTypeChanged('top')
	genreChanged('')
	return subtype
})

export const { nextPageE, prevPageE } = createApi($page, {
	nextPageE: (page) => page + 1,
	prevPageE: (page) => {
		if (page > 1) {
			return page - 1
		} else {
			return page
		}
	},
})

getAnimeListBaseFx.use(async ({ requestType, genre, page, subtype }) => {
	const res = await axios.get(
		`https://api.jikan.moe/v3/${requestType}/anime${genre}/${page}${subtype}`
	)
	const resList = res.data.top ? res.data.top : res.data.animeId
	return resList
})
export const getAnimeListFx = attach({
	source: combine({
		requestType: $requestType,
		genre: $genre,
		page: $page,
		subtype: $subtype,
	}),
	mapParams: (params, source) => source,
	effect: getAnimeListBaseFx,
})
