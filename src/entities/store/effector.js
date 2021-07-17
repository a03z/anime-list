import axios from 'axios'
import {
	attach,
	combine,
	createApi,
	createEffect,
	createEvent,
	createStore,
	forward,
	restore,
} from 'effector'

// страница запроса
export const setPage = createEvent()
export const $page = restore(setPage, 1)
export const { nextPageE, prevPageE } = createApi($page, {
	nextPageE: page => page + 1,
	prevPageE: page => {
		if (page > 1) {
			return page - 1
		} else {
			return page
		}
	},
})

// тип запроса - сортировка аниме по жанру или по рейтингу
export const setRequestType = createEvent()
export const $requestType = restore(setRequestType, 'top')

// айди жанра
export const setGenre = createEvent()
export const $genre = restore(setGenre, '')
// тип сортировки
export const setSortType = createEvent()
export const $sortType = restore(setSortType, '')
// подтип сортировки
export const setSubtype = createEvent()
export const $subtype = createStore('').on(setSubtype, (_, subtype) => {
	setRequestType('top')
	setGenre('')
	return subtype
})

// anime id
export const setAnimeId = createEvent()
export const $animeId = restore(setAnimeId, 1)

export const setAnimeParameter = createEvent()
export const setAnimeRequest = createEvent()

const $animeRequest = restore(setAnimeRequest, '')
const $animeParameter = restore(setAnimeParameter, '')

// title store

export const setTitle = createEvent()
export const $title = restore(setTitle, 'Anime List | by a03z')

$title.watch(s => {
	document.title = s
})

// ------effects------

// основной лист аниме

const getAnimeListBaseFx = createEffect(
	async ({ requestType, genre, page, subtype }) => {
		setIsFetching(true)
		const res = await axios.get(
			`https://api.jikan.moe/v3/${requestType}/anime${genre}/${page}${subtype}`
		)
		const resList = res.data.top ? res.data.top : res.data.anime
		setIsFetching(false)
		return resList
	}
)

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

// поиск
export const setSearchText = createEvent()

export const $searchText = restore(setSearchText, '')

const searchAnimeListFxBase = createEffect(async ({ page, searchText }) => {
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

export const setEffectType = createEvent()
export const $effectType = restore(setEffectType, 'getAnime')
// конкретное аниме

const getExactAnimeBaseFx = createEffect(async ({ id }) => {
	const res = await axios.get(`https://api.jikan.moe/v3/anime/${id}`)
	return res.data
})

export const getExactAnimeFx = attach({
	source: combine({
		id: $animeId,
		request: $animeRequest,
		parameter: $animeParameter,
	}),
	mapParams: (params, source) => source,
	effect: getExactAnimeBaseFx,
})
const getExactAnimeReviewsBaseFx = createEffect(async ({ id }) => {
	const res = await axios.get(`https://api.jikan.moe/v3/anime/${id}/reviews`)
	return res.data
})

export const getExactAnimeReviewsFx = attach({
	source: combine({
		id: $animeId,
		request: $animeRequest,
	}),
	mapParams: (params, source) => source,
	effect: getExactAnimeReviewsBaseFx,
})

forward({
	from: $animeId,
	to: [getExactAnimeFx, getExactAnimeReviewsFx],
})

export const $exactAnimeData = createStore({}).on(
	getExactAnimeFx.doneData,
	(_, data) => data
)
export const $exactAnimeReviews = createStore([]).on(
	getExactAnimeReviewsFx.doneData,
	(_, data) => data.reviews
)

export const $exactAnime = combine(
	$exactAnimeData,
	$exactAnimeReviews,
	(exactAnime, reviews) => ({ ...exactAnime, reviews })
)

// загрузка
export const setIsFetching = createEvent()
export const $isFetching = combine(
	[
		getAnimeListFx.pending,
		searchAnimeListFx.pending,
		getExactAnimeFx.pending,
	],
	pendings => pendings.some(Boolean)
)

export const $list = createStore([])
	.on(getAnimeListBaseFx.doneData, (_, list) => list)
	.on(searchAnimeListFx.doneData, (_, list) => list)
