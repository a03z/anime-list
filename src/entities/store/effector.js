import axios from 'axios'
import {
	attach,
	combine,
	createApi,
	createEffect,
	createStore,
	forward,
	restore,
	createEvent,
} from 'effector'

// events
export const setPage = createEvent()
export const setRequestType = createEvent()
export const setSortType = createEvent()
export const setGenre = createEvent()
export const setSubtype = createEvent()
export const setAnimeId = createEvent()
export const setAnimeParameter = createEvent()
export const setAnimeRequest = createEvent()
export const setEffectType = createEvent()
export const setTitle = createEvent()
export const setSearchText = createEvent()

// стор для страницы запроса
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

// смена типа запроса и сортировки
export const $requestType = restore(setRequestType, 'top')
export const $sortType = restore(setSortType, '')

// сторы для списка жанров и айди конкретного жанра

export const getGenreListFx = createEffect(async () => {
	const res = await axios.get(`https://api.jikan.moe/v4/genres/anime`)
	return res.data.data
})

export const $genres = restore(getGenreListFx, [])
export const $genre = restore(setGenre, '')

// стор для подтипа запроса (вспомогательный стор для запроса)
export const $subtype = createStore('').on(setSubtype, (_, subtype) => {
	setRequestType('top')
	setGenre('')
	return subtype
})

// айди текущего аниме
export const $animeId = restore(setAnimeId, 1)

// вспомогательные сторы для запросов

export const $animeRequest = restore(setAnimeRequest, '')
export const $animeParameter = restore(setAnimeParameter, '')

// смена типа эффекта (вспомогательный стор для запроса)

export const $effectType = restore(setEffectType, 'getAnime')

// получение списка аниме
const getAnimeListBaseFx = createEffect(
	async ({ requestType, genre, page, subtype }) => {
		const res = await axios.get(
			`https://api.jikan.moe/v3/${requestType}/anime${genre}/${page}${subtype}`
		)
		const resList = res.data.top ? res.data.top : res.data.animeId
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

// смена тайтла страницы
export const $title = restore(setTitle, 'Anime List | by a03z')

// поиск аниме
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

// получение конкретного аниме
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
// получение отзывов о конкретном аниме
const getExactAnimeReviewsBaseFx = createEffect(async ({ id }) => {
	const res = await axios.get(`https://api.jikan.moe/v3/anime/${id}/reviews`)
	return res.data.reviews
})
export const getExactAnimeReviewsFx = attach({
	source: combine({
		id: $animeId,
		request: $animeRequest,
	}),
	mapParams: (params, source) => source,
	effect: getExactAnimeReviewsBaseFx,
})
// конкретное аниме для отдельное страницы
export const $exactAnimeData = restore(getExactAnimeFx, {})
export const $exactAnimeReviews = restore(getExactAnimeReviewsFx, [])

export const $exactAnime = combine(
	$exactAnimeData,
	$exactAnimeReviews,
	(exactAnime, reviews) => ({ ...exactAnime, reviews })
)
// получение данных об аниме каждый раз когда меняется айди от аниме
forward({
	from: $animeId,
	to: [getExactAnimeFx, getExactAnimeReviewsFx],
})

export const $isFetching = combine(
	[
		getAnimeListFx.pending,
		getExactAnimeFx.pending,
		getExactAnimeReviewsFx.pending,
		searchAnimeListFx.pending,
	],
	pendings => pendings.some(Boolean)
)
export const $list = createStore([])
	.on(getAnimeListFx.doneData, (_, list) => list)
	.on(searchAnimeListFx.doneData, (_, list) => list)
