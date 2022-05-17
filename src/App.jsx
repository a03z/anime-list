import React, { useEffect, useState } from 'react'
import '../node_modules/reseter.css/css/reseter.min.css'
import './App.css'
import { useStore } from 'effector-react'
import { Sort } from './components/Sort'
import { Genres } from './pages/Genres'
import { Navbar } from './components/Navbar'
import { Search } from './pages/Search'
import { Preloader } from './features/Preloader/Preloader'
import { AnimePage } from './pages/AnimePage'
import { ROUTES } from './entities/routes/routes'
import { TopBtn } from './features/TopBtn/TopBtn'
import { $isFetching } from './entities/store/effector'
import { Route, Routes } from 'react-router-dom'
import { ListLayout } from './components/ListLayout'
import { getAnimeListFx } from './pages/List/model'

const App = () => {
	const [isSearchShown, setIsSearchShown] = useState(false)
	let isFetching = useStore($isFetching)
	useEffect(() => {
		getAnimeListFx()
	}, [])
	return isFetching ? (
		<Preloader />
	) : (
		<div className='App'>
			<header>
				<Navbar
					toggleSearch={() => {
						setIsSearchShown(!isSearchShown)
					}}
				/>
				{isSearchShown ? <Search /> : <></>}
				<Sort />
			</header>
			<Routes>
				<Route exact path={ROUTES.MAIN_PAGE} element={<ListLayout />}>
					<Route path={ROUTES.GENRES} element={<Genres />} />
				</Route>
				<Route path={ROUTES.ANIME} element={<AnimePage />} />
			</Routes>

			<TopBtn />
		</div>
	)
}

export default App
