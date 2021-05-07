import React, { useEffect } from 'react'
import '../node_modules/reseter.css/css/reseter.min.css'
import './App.css'
import { List } from './components/List/List'
import { Sort } from './components/Sort/Sort'
import { Genres } from './components/Genres/Genres'
import { Route } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import {
	$page,
	$requestType,
	$subtype,
	$list,
	$isFetching,
	nextPageE,
	prevPageE,
	setRequestType,
	getAnimeListFx,
} from './store/effector'
import { useStore } from 'effector-react'
import { Search } from './components/Search/Search'
import { Preloader } from './features/Preloader/Preloader'

function App() {
	// effector
	let page = useStore($page)
	let requestType = useStore($requestType)
	let subtype = useStore($subtype)
	let isFetching = useStore($isFetching)

	let list = useStore($list)
	// --------------

	const nextPage = () => {
		nextPageE()
		getAnimeListFx(requestType, '', page, subtype)
	}

	const prevPage = () => {
		prevPageE()
		if (page === 1) {
			return
		} else {
			getAnimeListFx(requestType, '', page, subtype)
		}
	}

	useEffect(() => {
		getAnimeListFx(requestType, '', page, subtype)
	}, [])

	if (isFetching) {
		return <Preloader />
	} else {
		return (
			<div className='App'>
				<Navbar />
				<Route path='/search' render={() => <Search />} />
				<Sort getAnimeListFx={getAnimeListFx} />
				<Route
					path='/genres'
					render={() => (
						<Genres
							setRequestType={setRequestType}
							list={list}
							page={page}
							getAnimeListFx={getAnimeListFx}
						/>
					)}
				/>

				<List
					page={page}
					list={list}
					prevPage={prevPage}
					nextPage={nextPage}
				/>
			</div>
		)
	}
}

export default App
