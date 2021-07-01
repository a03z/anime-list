import React, { useEffect } from 'react'
import '../node_modules/reseter.css/css/reseter.min.css'
import './App.css'
import { List } from './components/List/List'
import { Sort } from './components/Sort/Sort'
import { Genres } from './components/Genres/Genres'
import { Route } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { $isFetching, getAnimeListFx } from './entities/store/effector'
import { useStore } from 'effector-react'
import { Search } from './components/Search/Search'
import { Preloader } from './features/Preloader/Preloader'
import { AnimePage } from './components/AnimePage/AnimePage'
import { ROUTES } from './entities/routes/routes'
import { TopBtn } from './features/TopBtn/TopBtn'

function App() {
	// effector
	let isFetching = useStore($isFetching)
	// --------------

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

				<Route exact path={ROUTES.SEARCH} render={() => <List />} />
				<Route
					path={ROUTES.GENRES}
					render={() => (
						<>
							<Genres />
							<List />
						</>
					)}
				/>
				<Route path={ROUTES.ANIME} render={() => <AnimePage />} />
				<Route exact path={ROUTES.MAIN_PAGE} render={() => <List />} />
				<Route exact path={ROUTES.TOP} render={() => <List />} />
				<TopBtn />
			</div>
		)
	}
}

export default App
