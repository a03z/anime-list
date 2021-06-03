import React, { useEffect } from 'react'
import '../node_modules/reseter.css/css/reseter.min.css'
import './App.css'
import { List } from './components/List/List'
import { Sort } from './components/Sort/Sort'
import { Genres } from './components/Genres/Genres'
import { Route } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { $page, $list, $isFetching, nextPageE, prevPageE, setRequestType, getAnimeListFx, $effectType, searchAnimeListFx } from './store/effector'
import { useStore } from 'effector-react'
import { Search } from './components/Search/Search'
import { Preloader } from './features/Preloader/Preloader'
import { AnimePage } from './components/AnimePage/AnimePage'

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
					<Route path='/search' render={() => <Search />} />
					<Sort />
				</header>

				<Route exact path='/search' render={() => <List page={page} list={list} prevPage={prevPage} nextPage={nextPage} />} />
				<Route
					path='/genres'
					render={() => (
						<>
							<Genres setRequestType={setRequestType} list={list} page={page} />
							<List page={page} list={list} prevPage={prevPage} nextPage={nextPage} />
						</>
					)}
				/>
				<Route path='/anime/:animeId?' render={() => <AnimePage />} />
				<Route exact path='/' render={() => <List page={page} list={list} prevPage={prevPage} nextPage={nextPage} />} />
				<Route exact path='/top' render={() => <List page={page} list={list} prevPage={prevPage} nextPage={nextPage} />} />
			</div>
		)
	}
}

export default App
