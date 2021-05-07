import axios from 'axios'
import { createApi, createEffect, createEvent, createStore } from 'effector'

// страница запроса
export const setPage = createEvent()
export const $page = createStore(1).on(setPage, (state, page) => {
	state = page
	return state
})
export const { nextPageE, prevPageE } = createApi($page, {
	nextPageE: state => state + 1,
	prevPageE: state => {
		if (state > 1) {
			return state - 1
		} else {
			return state
		}
	},
})

// тип запроса - сортировка аниме по жанру или по рейтингу
export const setRequestType = createEvent()
export const $requestType = createStore('top').on(
	setRequestType,
	(state, requestType) => {
		state = requestType
		return state
	}
)

// айди жанра
export const setGenre = createEvent()
export const $genre = createStore('').on(setGenre, (state, genreId) => {
	state = genreId
	return state
})
// тип сортировки
export const setSortType = createEvent()
export const $sortType = createStore('').on(setSortType, (state, sortType) => {
	state = sortType
	return state
})

// подтип сортировки
export const setSubtype = createEvent()
export const $subtype = createStore('').on(setSubtype, (state, subtype) => {
	setRequestType('top')
	setGenre('')
	state = subtype
	return state
})
// загрузка
export const setIsFetching = createEvent()
export const $isFetching = createStore(false).on(
	setIsFetching,
	(state, isFetching) => {
		state = isFetching
		return state
	}
)

// ------effects------

// основной лист аниме

export const getAnimeListFx = createEffect(async () => {
	setIsFetching(true)
	const res = await axios.get(
		`https://api.jikan.moe/v3/${$requestType.getState()}/anime${$genre.getState()}/${$page.getState()}${$subtype.getState()}`
	)
	let resList = res.data.top ? res.data.top : res.data.anime
	setIsFetching(false)
	return resList
})

// поиск
export const setSearchText = createEvent()

export const $searchText = createStore('').on(setSearchText, (state, text) => {
	state = text
	return state
})

export const searchAnimeListFx = createEffect(async () => {
	setIsFetching(true)
	const res = await axios.get(
		`https://api.jikan.moe/v3/search/anime?q=${$searchText.getState()}&page=${$page.getState()}`
	)
	let resList = res.data.results
	setIsFetching(false)
	return resList
})
export const $list = createStore([])
	.on(getAnimeListFx.doneData, (_, list) => list)
	.on(searchAnimeListFx.doneData, (_, list) => list)
