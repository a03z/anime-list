import { combine, createStore, restore, createEvent } from 'effector'
import {
	getExactAnimeFx,
	getExactAnimeReviewsFx,
} from '../../pages/AnimePage/model'
import { getAnimeListFx } from '../../pages/List/model'
import { searchAnimeListFx } from '../../pages/Search/model'

// events
export const effectTypeChanged = createEvent()
export const titleChanged = createEvent()

// смена типа эффекта (вспомогательный стор для запроса)
export const $effectType = restore(effectTypeChanged, 'getAnime')

// смена тайтла страницы
export const $title = restore(titleChanged, 'Anime List | by a03z')
$title.watch((t) => {
	document.title = t
})

// стор статуса запроса (в процессе/готов)
export const $isFetching = combine(
	[
		getAnimeListFx.pending,
		getExactAnimeFx.pending,
		getExactAnimeReviewsFx.pending,
		searchAnimeListFx.pending,
	],
	(pendings) => pendings.some(Boolean)
)
export const $list = createStore([])
	.on(getAnimeListFx.doneData, (_, list) => list)
	.on(searchAnimeListFx.doneData, (_, list) => list)
