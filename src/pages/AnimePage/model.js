import axios from 'axios'
import {
	attach,
	combine,
	createEffect,
	createEvent,
	forward,
	restore,
} from 'effector'

export const animeIdChanged = createEvent()
export const animeParameterChanged = createEvent()
export const animeRequestChanged = createEvent()

const getExactAnimeReviewsBaseFx = createEffect()
const getExactAnimeBaseFx = createEffect()

// айди текущего аниме
export const $animeId = restore(animeIdChanged, 1)

// вспомогательные сторы для запросов

export const $animeRequest = restore(animeRequestChanged, '')
export const $animeParameter = restore(animeParameterChanged, '')

// получение конкретного аниме
getExactAnimeBaseFx.use(async ({ id }) => {
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

getExactAnimeReviewsBaseFx.use(async ({ id }) => {
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
