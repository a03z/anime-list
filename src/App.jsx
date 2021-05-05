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
	nextPageE,
	prevPageE,
	setRequestType,
	getAnimeListFx,
	$list,
} from './store/effector'
import { useStore } from 'effector-react'

function App() {
	// effector
	let page = useStore($page)
	let requestType = useStore($requestType)
	let subtype = useStore($subtype)

	let list = useStore($list)
	console.log(list)
	// --------------

	const scrollToTop = () => {
		if (window.pageYOffset > 0) {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	const nextPage = () => {
		nextPageE()
		getAnimeListFx(requestType, '', page, subtype)
		scrollToTop()
	}

	const prevPage = () => {
		prevPageE()
		getAnimeListFx(requestType, '', page, subtype)
		scrollToTop()
	}

	useEffect(() => {
		getAnimeListFx(requestType, '', page, subtype)
	}, [])

	return (
		<div className='App'>
			<Navbar />
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

export default App
