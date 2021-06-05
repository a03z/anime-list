import React, { useEffect } from 'react'
import '../node_modules/reseter.css/css/reseter.min.css'
import './App.css'
import { List } from './components/List/List'
import { Sort } from './components/Sort/Sort'
import { Genres } from './components/Genres/Genres'
import { Route } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { $page, $list, $isFetching, nextPageE, prevPageE, setRequestType, getAnimeListFx, $effectType, searchAnimeListFx } from './entities/store/effector'
import { useStore } from 'effector-react'
import { Search } from './components/Search/Search'
import { Preloader } from './features/Preloader/Preloader'
import { AnimePage } from './components/AnimePage/AnimePage'
import { ROUTES } from './entities/routes/routes'

function App() {
	// effector
	let page = useStore($page)
	let isFetching = useStore($isFetching)
	let effectType = useStore($effectType)

	let list = useStore($list)
	// --------------

	const nextPage = () => {
		nextPageE()
		effectType === 'getAnime' ? getAnimeListFx() : searchAnimeListFx()
	}

	const prevPage = () => {
		prevPageE()
		if (page === 1) {
			return
		} else {
			effectType === 'getAnime' ? getAnimeListFx() : searchAnimeListFx()
		}
	}

	useEffect(() => {
		getAnimeListFx()
	}, [])

	if (isFetching) {
		return <Preloader />
	} else {
		return (
			<div className='App'>
				<header>
					<Navbar />
					<Route path={ROUTES.SEARCH} render={() => <Search />} />
					<Sort />
				</header>

				<Route exact path={ROUTES.SEARCH} render={() => <List page={page} list={list} prevPage={prevPage} nextPage={nextPage} />} />
				<Route
					path={ROUTES.GENRES}
					render={() => (
						<>
							<Genres setRequestType={setRequestType} list={list} page={page} />
							<List page={page} list={list} prevPage={prevPage} nextPage={nextPage} />
						</>
					)}
				/>
				<Route path={ROUTES.ANIME} render={() => <AnimePage />} />
				<Route exact path={ROUTES.MAIN_PAGE} render={() => <List page={page} list={list} prevPage={prevPage} nextPage={nextPage} />} />
				<Route exact path={ROUTES.TOP} render={() => <List page={page} list={list} prevPage={prevPage} nextPage={nextPage} />} />
			</div>
		)
	}
}

export default App
