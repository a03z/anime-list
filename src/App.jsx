import React, { useEffect } from 'react'
import '../node_modules/reseter.css/css/reseter.min.css'
import './App.css'
import { Route } from 'react-router-dom'
import { useStore } from 'effector-react'
import { List } from './pages/List'
import { Sort } from './components/Sort'
import { Genres } from './pages/Genres'
import { Navbar } from './components/Navbar'
import { Search } from './pages/Search'
import { Preloader } from './features/Preloader/Preloader'
import { AnimePage } from './pages/AnimePage'
import { ROUTES } from './entities/routes/routes'
import { TopBtn } from './features/TopBtn/TopBtn'
import { $isFetching, getAnimeListFx } from './entities/store/effector'
const App = () => {
	// effector
	let isFetching = useStore($isFetching)
	// --------------
	useEffect(() => {
		getAnimeListFx()
	}, [])
	return isFetching ? (
		<Preloader />
	) : (
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

export default App
